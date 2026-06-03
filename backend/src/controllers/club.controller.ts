import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export async function createClub(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, description, established } = req.body;
    const club = await prisma.club.create({
      data: { name, description, established },
    });
    res.status(201).json({ success: true, data: club });
  } catch (error) {
    next(error);
  }
}

export async function getAllClubs(req: Request, res: Response, next: NextFunction) {
  try {
    const clubs = await prisma.club.findMany({
      include: { events: true },
    });
    res.status(200).json({ success: true, data: clubs });
  } catch (error) {
    next(error);
  }
}

export async function getClubById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const club = await prisma.club.findUnique({
      where: { id },
      include: { events: true },
    });
    if (!club) {
      return res.status(404).json({ success: false, error: "Club not found" });
    }
    res.status(200).json({ success: true, data: club });
  } catch (error) {
    next(error);
  }
}

export async function updateClub(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, description, established } = req.body;
    const club = await prisma.club.update({
      where: { id },
      data: { name, description, established },
    });
    res.status(200).json({ success: true, data: club });
  } catch (error) {
    next(error);
  }
}

export async function deleteClub(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.club.delete({
      where: { id },
    });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}
