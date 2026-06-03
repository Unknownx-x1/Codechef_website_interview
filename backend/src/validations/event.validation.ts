import { z } from "zod";

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Title is too short"),
    category: z.enum(["Hackathon", "Workshop", "Contest", "Seminar"]),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    venue: z.string().min(2, "Venue is too short"),
    summary: z.string().min(5, "Summary is too short"),
    description: z.string().min(10, "Description is too short"),
    prize: z.string().optional(),
    track: z.string().min(2, "Track is too short"),
    topics: z.array(z.string()).min(1, "At least one topic must be specified"),
    format: z.string().min(2, "Format is too short"),
    duration: z.string().min(1, "Duration is too short"),
    mode: z.enum(["Online", "Offline", "Hybrid"]),
    clubId: z.string().uuid("Invalid Club UUID").optional().nullable(),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Event ID is required"),
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    category: z.enum(["Hackathon", "Workshop", "Contest", "Seminar"]).optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }).optional(),
    venue: z.string().min(2).optional(),
    summary: z.string().min(5).optional(),
    description: z.string().min(10).optional(),
    prize: z.string().optional(),
    track: z.string().min(2).optional(),
    topics: z.array(z.string()).min(1).optional(),
    format: z.string().min(2).optional(),
    duration: z.string().min(1).optional(),
    mode: z.enum(["Online", "Offline", "Hybrid"]).optional(),
    clubId: z.string().uuid().optional().nullable(),
  }),
});

export const eventIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Event ID is required"),
  }),
});
