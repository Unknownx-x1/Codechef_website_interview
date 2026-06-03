import { z } from "zod";

export const createRegistrationSchema = z.object({
  body: z.object({
    eventId: z.string().min(1, "Event ID is required"),
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    registrationNumber: z.string().min(4, "Registration number is too short"),
    department: z.string().min(2, "Department name is too short"),
    year: z.string().min(1, "Year must be specified"),
    teamName: z.string().optional().nullable(),
  }),
});

export const registrationIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid Registration UUID"),
  }),
});
