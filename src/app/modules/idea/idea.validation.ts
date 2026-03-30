import { z } from "zod";

export const createIdeaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().uuid("Invalid Category ID"), 
  isPaid: z.boolean().optional(),
  price: z.number().nonnegative().optional(), 
});

export const updateIdeaSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  categoryId: z.string().uuid().optional(), 
  isPaid: z.boolean().optional(),
  price: z.number().nonnegative().optional(), 
});