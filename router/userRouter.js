import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  authorizePermissions('admin'),
  validateUpdateUserInput,
  updateUser
);
router.get("/admin/app-stats", getApplicationStats);

export default router;
