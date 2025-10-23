import z from "zod";

export const profileSchema = z.object({
  displayName: z.string().min(2).max(50),
  profilePicURL: z.url(),
  bio: z.string().max(300).optional(),
  skills: z.array(z.string().min(1)).max(15).optional(),
});
