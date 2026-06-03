import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createEventSchema,
  updateEventSchema,
  eventIdParamSchema,
} from "../validations/event.validation";

const router = Router();

router.post("/", validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", validate(eventIdParamSchema), getEventById);
router.put("/:id", validate(updateEventSchema), updateEvent);
router.delete("/:id", validate(eventIdParamSchema), deleteEvent);

export default router;
