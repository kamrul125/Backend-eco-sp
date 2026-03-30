import { Response } from "express";
import sendResponse from "../../../helpers/response"; // কার্লি ব্রেসেস দিবেন না ✅
import catchAsync from "../../../utils/catchAsync"; 

export const getMe = catchAsync(async (req: any, res: Response) => {
  const user = req.user; 

  // sendResponse এখন callable হবে
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: user,
  });
});

export const getAllUsers = catchAsync(async (req: any, res: Response) => {
  const users: any[] = []; 

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users retrieved successfully",
    data: users,
  });
});