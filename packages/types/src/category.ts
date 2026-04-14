import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().nullable().optional(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  is_active: z.boolean().default(true),
});

export type Category = z.infer<typeof CategorySchema>;
