import { Request, Response } from "express";
import * as categoryService from "./category.service";
import catchAsync from "../../../utils/catchAsync";

// ১. নতুন ক্যাটাগরি তৈরি করা (Admin only)
export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  
 
  const user = (req as any).user; 

  const category = await categoryService.createCategory(
    name, 
    user.id as string, 
    user.role as string
  );

 
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});


export const getCategories = catchAsync(async (req: Request, res: Response) => {
  
  const categories = await categoryService.getAllCategories();

  // সরাসরি রেসপন্স পাঠানো হচ্ছে
  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    results: categories.length,
    data: categories, 
  });
});