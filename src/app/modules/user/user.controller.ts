import { Response } from "express";
import sendResponse from "../../../helpers/response"; 
import catchAsync from "../../../utils/catchAsync"; 
import { prisma } from "../../../config/prisma"; 

/**
 * লগইন করা ইউজারের প্রোফাইল দেখার জন্য
 */
export const getMe = catchAsync(async (req: any, res: Response) => {
  const user = req.user; 

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: user,
  });
});

/**
 * অ্যাডমিন প্যানেলের জন্য সব ইউজার লিস্ট নিয়ে আসা
 */
export const getAllUsers = catchAsync(async (req: any, res: Response) => {
 
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
     
    },
    orderBy: {
      createdAt: 'desc' 
    }
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});