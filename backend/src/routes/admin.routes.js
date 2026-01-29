const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const db = require("../models");

router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.json({ users });
  }
);

module.exports = router;