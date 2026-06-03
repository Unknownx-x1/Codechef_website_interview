import { Router } from "express";
import {
  createRegistration,
  getAllRegistrations,
  cancelRegistration,
} from "../controllers/registration.controller";
import { validate } from "../middleware/validation.middleware";
import {
  createRegistrationSchema,
  registrationIdParamSchema,
} from "../validations/registration.validation";

const router = Router();

router.post("/", validate(createRegistrationSchema), createRegistration);
router.get("/", getAllRegistrations);
router.delete("/:id", validate(registrationIdParamSchema), cancelRegistration);

export default router;
