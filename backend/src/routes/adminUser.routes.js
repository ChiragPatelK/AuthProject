const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const adminUserController = require("../controllers/adminUser.controller");

router.use(authMiddleware);
router.use(authorizeRoles("admin"));

router.get("/users", adminUserController.getAllUsers);
router.get("/users/:id", adminUserController.getUserById);
router.put("/users/:id", adminUserController.updateUser);
router.delete("/users/:id", adminUserController.deleteUser);

module.exports = router;
