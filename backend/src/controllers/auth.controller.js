const bcrypt = require("bcrypt");
const db = require("../models");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const existingUser = await db.User.findOne({
      where: { email },
      transaction: t,
    });

    if (existingUser) {
      await t.rollback();
      return res.status(409).json({
        message: "User already exists",
      });
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

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// login  
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// change password

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const user = await db.User.findByPk(userId, { transaction: t });

    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      await t.rollback();
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save({ transaction: t });

    await t.commit();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: "Failed to change password",
    });
  }
};

// otp logic 
const transporter = require("../config/mail");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const user = await db.User.findOne({
      where: { email },
      transaction: t,
    });

    if (!user) {
      await t.rollback();
      return res.status(200).json({
        message: "If the email exists, an OTP has been sent",
      });
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
      text: `Your password reset OTP is ${otp}. It is valid for 10 minutes.`,
    });

    await t.commit();

    return res.status(200).json({
      message: "If the email exists, an OTP has been sent",
    });
  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      message: "Failed to process forgot password request",
    });
  }
};

// reset logic 

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const user = await db.User.findOne({
      where: { email },
      transaction: t,
    });

    if (!user) {
      await t.rollback();
      return res.status(400).json({
        message: "Invalid OTP or email",
      });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      await t.rollback();
      return res.status(400).json({
        message: "Invalid OTP or email",
      });
    }

    if (user.resetOtpExpiry < new Date()) {
      await t.rollback();
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save({ transaction: t });

    await t.commit();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      message: "Failed to reset password",
    });
  }
};