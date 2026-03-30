import { Request, Response } from "express";
import * as ideaService from "./idea.service";
import catchAsync from "../../../utils/catchAsync";
import { createIdeaSchema, updateIdeaSchema } from "./idea.validation";

export const createIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const data = createIdeaSchema.parse(req.body);
  const result = await ideaService.createIdea(String(user.id), data);
  res.status(201).json({ success: true, message: "Idea created successfully", data: result });
});

export const getAllIdeas = catchAsync(async (req: Request, res: Response) => {
  const result = await ideaService.getAllIdeas();
  res.status(200).json({ success: true, message: "Ideas fetched successfully", data: result });
});

export const getIdeaById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ideaService.getIdeaById(id as string);
  if (!result) return res.status(404).json({ success: false, message: "Idea not found" });
  res.status(200).json({ success: true, message: "Idea fetched successfully", data: result });
});

export const updateIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  const data = updateIdeaSchema.parse(req.body);
  const result = await ideaService.updateIdea(String(user.id), id as string, data);
  res.status(200).json({ success: true, message: "Idea updated successfully", data: result });
});

export const deleteIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  await ideaService.deleteIdea(String(user.id), String(user.role), id as string);
  res.status(200).json({ success: true, message: "Idea deleted successfully" });
});

export const approveIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ideaService.approveIdea(id as string);
  res.status(200).json({ success: true, message: "Idea approved successfully", data: result });
});

export const rejectIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { feedback } = req.body;
  const result = await ideaService.rejectIdea(id as string, feedback);
  res.status(200).json({ success: true, message: "Idea rejected successfully", data: result });
});