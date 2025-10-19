import z from "zod";

export const userSchema = z.object({
  email: z.email({
    pattern: /^[0-9]+@kiit\.ac\.in$/,
    message: "Only KIIT email address is authorized.",
  }),
  password: z
    .string()
    .min(6, { message: "Provide at least 6 characters for password." })
    .max(15, { message: "Maximum 15 characters allowed for password." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, #, $, %, &).",
    }),
});
