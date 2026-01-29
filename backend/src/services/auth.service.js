const bcrypt = require("bcrypt");
const db = require("../models");
const transporter = require("../config/mail");
const { generateToken } = require("../utils/jwt");

class AuthService {
  // 🔹 REGISTER USER
  static async register({ name, email, password }) {
    const t = await db.sequelize.transaction();

    try {
      const existingUser = await db.User.findOne({
        where: { email },
        transaction: t,
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.User.create(
        {
          name,
          email,
          password: hashedPassword,
        },
        { transaction: t }
      );

      await t.commit();

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // 🔹 LOGIN USER
  static async login({ email, password }) {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return token;
  }

  // 🔹 CHANGE PASSWORD
  static async changePassword(userId, oldPassword, newPassword) {
    const t = await db.sequelize.transaction();

    try {
      const user = await db.User.findByPk(userId, { transaction: t });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw new Error("Old password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedNewPassword;
      await user.save({ transaction: t });

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // 🔹 FORGOT PASSWORD (SEND OTP)
  static async forgotPassword(email) {
    const t = await db.sequelize.transaction();

    try {
      const user = await db.User.findOne({ where: { email }, transaction: t });

      if (!user) {
        // Do not reveal user existence
        await t.rollback();
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      user.resetOtp = otp;
      user.resetOtpExpiry = otpExpiry;

      await user.save({ transaction: t });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Password Reset OTP",
        text: `Your OTP is ${otp}. Valid for 10 minutes.`,
      });

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // 🔹 RESET PASSWORD (VERIFY OTP)
  static async resetPassword({ email, otp, newPassword }) {
    const t = await db.sequelize.transaction();

    try {
      const user = await db.User.findOne({ where: { email }, transaction: t });

      if (!user || user.resetOtp !== otp) {
        throw new Error("Invalid OTP or email");
      }

      if (user.resetOtpExpiry < new Date()) {
        throw new Error("OTP has expired");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetOtp = null;
      user.resetOtpExpiry = null;

      await user.save({ transaction: t });

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = AuthService;
