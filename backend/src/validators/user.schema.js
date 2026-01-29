const { z } = require("zod");

const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email").optional(),
});

module.exports = {
  updateUserSchema,
};
