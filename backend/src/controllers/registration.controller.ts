import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function createRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      eventId,
      name,
      email,
      registrationNumber,
      department,
      year,
      teamName,
    } = req.body;

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    // Check if registration already exists for same email + event
    const existing = await prisma.registration.findFirst({
      where: { eventId, email },
    });
    if (existing) {
      return res.status(400).json({ success: false, error: "You are already registered for this event" });
    }

    const registration = await prisma.registration.create({
      data: {
        eventId,
        name,
        email,
        registrationNumber,
        department,
        year,
        teamName,
      },
    });

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
}

export async function getAllRegistrations(req: Request, res: Response, next: NextFunction) {
  try {
    const registrations = await prisma.registration.findMany({
      include: { event: true },
    });
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
}

export async function cancelRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.registration.delete({
      where: { id },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}
