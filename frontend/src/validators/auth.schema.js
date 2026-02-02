import { z } from "zod";

/* =========================
   LOGIN SCHEMA
========================= */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* =========================
   REGISTER SCHEMA
========================= */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* =========================
   CHANGE PASSWORD SCHEMA
========================= */
export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Old password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters"),
});

/* =========================
   FORGOT PASSWORD SCHEMA
========================= */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
});

/* =========================
   RESET PASSWORD SCHEMA
========================= */
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
