import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  upload.single("avatar"),
  authorizePermissions("admin"),
  validateUpdateUserInput,
  updateUser
);
router.get("/admin/app-stats", getApplicationStats);

export default router;
