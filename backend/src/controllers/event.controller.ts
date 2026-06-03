import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function createEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      title,
      category,
      date,
      venue,
      summary,
      description,
      prize,
      track,
      topics,
      format,
      duration,
      mode,
      clubId,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        category,
        date: new Date(date),
        venue,
        summary,
        description,
        prize,
        track,
        topics: topics as any,
        format,
        duration,
        mode,
        clubId: clubId || null,
      },
    });

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function getAllEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await prisma.event.findMany({
      include: { club: true, registrations: true },
    });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
}

export async function getEventById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { club: true, registrations: true },
    });
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updateData: any = { ...req.body };
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}
