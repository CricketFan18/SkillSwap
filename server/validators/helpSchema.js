import z from "zod";

export const helpSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().max(300),
  images: z.array(z.string().min(1)).max(10).optional(),
  category: z.string().trim(),
  tags: z.array(z.string().min(2)).optional(),
})