import { Request, Response } from "express";
import * as ideaService from "./idea.service";
import catchAsync from "../../../utils/catchAsync";

export const createIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await ideaService.createIdea(String(user.id), req.body);
  res.status(201).json({ success: true, data: result });
});

export const getAllIdeas = catchAsync(async (req: Request, res: Response) => {
  const result = await ideaService.getAllIdeas(req.query);
  res.status(200).json({ success: true, data: result });
});

export const getIdeaById = catchAsync(async (req: Request, res: Response) => {
  // ✅ Fixed: Used String() to ensure type 'string'
  const result = await ideaService.getIdeaById(String(req.params.id));
  res.status(200).json({ success: true, data: result });
});

export const updateIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  // ✅ Fixed: Used String()
  const result = await ideaService.updateIdea(String(user.id), String(req.params.id), req.body);
  res.status(200).json({ success: true, data: result });
});

export const deleteIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  // ✅ Fixed: Used String()
  await ideaService.deleteIdea(String(user.id), String(user.role), String(req.params.id));
  res.status(200).json({ success: true, message: "Deleted" });
});

export const approveIdea = catchAsync(async (req: Request, res: Response) => {
  // ✅ Fixed: Used String()
  const result = await ideaService.approveIdea(String(req.params.id));
  res.status(200).json({ success: true, data: result });
});

export const rejectIdea = catchAsync(async (req: Request, res: Response) => {
  const { feedback } = req.body;
  // ✅ Fixed: Used String()
  const result = await ideaService.rejectIdea(String(req.params.id), feedback);
  res.status(200).json({ success: true, data: result });
});