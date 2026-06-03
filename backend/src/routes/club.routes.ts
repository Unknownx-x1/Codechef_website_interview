import { Router } from "express";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/club.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createClubSchema,
  updateClubSchema,
  clubIdParamSchema,
} from "../validations/club.validation";

const router = Router();

router.post("/", validate(createClubSchema), createClub);
router.get("/", getAllClubs);
router.get("/:id", validate(clubIdParamSchema), getClubById);
router.put("/:id", validate(updateClubSchema), updateClub);
router.delete("/:id", validate(clubIdParamSchema), deleteClub);

export default router;
