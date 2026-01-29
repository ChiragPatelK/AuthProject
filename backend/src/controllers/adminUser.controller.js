const AdminUserService = require("../services/adminUser.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await AdminUserService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await AdminUserService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await AdminUserService.updateUser(req.params.id, req.body);
    res.status(200).json({
      message: "User updated successfully",
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

exports.deleteUser = async (req, res) => {
  try {
    await AdminUserService.deleteUser(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
