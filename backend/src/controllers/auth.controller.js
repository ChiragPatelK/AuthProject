const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    await AuthService.changePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword
    );

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    await AuthService.forgotPassword(req.body.email);
    res.json({
      message: "If the email exists, an OTP has been sent",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to process request",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await AuthService.resetPassword(req.body);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
