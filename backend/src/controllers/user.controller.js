const UserService = require("../services/user.service");

exports.getMe = async (req, res) => {
  try {
    const user = await UserService.getMe(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await UserService.updateMe(req.user.id, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    res.status(400).json({ message: error.message });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    await UserService.deleteMe(req.user.id);
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
