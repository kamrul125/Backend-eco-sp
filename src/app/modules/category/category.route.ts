import { Router } from "express";
import * as categoryController from "./category.controller";
import protect from "../../../middlewares/auth.middleware";

const router = Router();

// ✅ GET ALL (Public)
router.get("/", categoryController.getCategories);

// ✅ CREATE (Admin only)
router.post("/", protect("ADMIN"), categoryController.createCategory);

export default router;