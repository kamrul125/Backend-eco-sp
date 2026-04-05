import { Router } from "express";
import * as ideaController from "./idea.controller"; // কন্ট্রোলার ইমপোর্ট করুন
import auth from "../../../middlewares/auth.middleware"; // প্রোটেক্ট মিডলওয়্যার

const router = Router();

router.get("/", ideaController.getAllIdeas);
router.get("/:id", ideaController.getIdeaById);

router.post("/", auth("USER", "ADMIN"), ideaController.createIdea);
router.put("/:id", auth("USER", "ADMIN"), ideaController.updateIdea);
router.patch("/approve/:id", auth("ADMIN"), ideaController.approveIdea);
router.patch("/reject/:id", auth("ADMIN"), ideaController.rejectIdea);
router.delete("/:id", auth("USER", "ADMIN"), ideaController.deleteIdea);

// ✅ এটিই index.ts এ ইমপোর্ট হবে
export const ideaRoutes = router;