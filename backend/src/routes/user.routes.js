const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/me", authMiddleware, userController.getMe);

const validate = require("../middlewares/validate.middleware");
const { updateUserSchema } = require("../validators/user.schema");

router.put(
    "/me",
    authMiddleware,
    validate(updateUserSchema),
    userController.updateMe
);

router.delete(
  "/me",
  authMiddleware,
  userController.deleteMe
);
module.exports = router;