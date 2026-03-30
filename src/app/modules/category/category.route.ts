import { Router } from "express";
import * as categoryController from "./category.controller";
import protect from "../../../middlewares/auth.middleware";
// যেহেতু 'protect' এখন নিজেই রোল চেক করতে পারে, 
// তাই 'restrictTo' এর আর আলাদা প্রয়োজন নেই। 

const router = Router();

// Public: যে কেউ ক্যাটাগরি দেখতে পারবে
router.get("/", categoryController.getCategories);

// Admin only: এখানে 'protect' কে ফাংশন হিসেবে কল করুন এবং রোল দিন
router.post(
  "/", 
  protect("ADMIN"), // 'protect' কে কল করা হয়েছে এবং 'ADMIN' রোল পাস করা হয়েছে ✅
  categoryController.createCategory
);

export default router;