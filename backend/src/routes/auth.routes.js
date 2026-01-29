const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { registerSchema } = require("../validators/auth.schema");
const { loginSchema } = require("../validators/auth.schema");
const { changePasswordSchema } = require("../validators/auth.schema");
const authMiddleware = require("../middlewares/auth.middleware");
const { forgotPasswordSchema } = require("../validators/auth.schema");
const { resetPasswordSchema } = require("../validators/auth.schema");

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.put(
    "/change-password",
    authMiddleware,
    validate(changePasswordSchema),
    authController.changePassword
);

router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    authController.forgotPassword
);

router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    authController.resetPassword
);

module.exports = router;