import { z } from "zod";

export const createClubSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    description: z.string().min(5, "Description must be at least 5 characters long"),
    established: z.string().min(4, "Established year must be at least 4 digits"),
  }),
});

export const updateClubSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(5).optional(),
    established: z.string().min(4).optional(),
  }),
});

export const clubIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid UUID format"),
  }),
});
