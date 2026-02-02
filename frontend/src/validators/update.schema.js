import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .optional(),

    email: z
      .string()
      .email("Please enter a valid email")
      .optional(),
  })
  .refine(
    (data) => data.name || data.email,
    {
      message: "At least one field is required to update",
    }
  );
