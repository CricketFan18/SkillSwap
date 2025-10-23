import z from "zod";

export const profileSchema = z.object({
  displayName: z.string().min(2).max(30),
  profilePicURL: z.url().optional(),
  bio: z.string().max(300).optional(),
  skills: z.array(z.string().min(1)).max(15).optional(),
});
