import { Router } from "express";
const router = Router();
import { login, register } from "../controller/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);

export default router;
