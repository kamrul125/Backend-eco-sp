import { Request, Response } from "express";
import * as paymentService from "./payment.service";
import catchAsync from "../../../utils/catchAsync";

export const handlePurchaseIdea = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { ideaId } = req.body; 

  // ✅ ১. ডিবাগিং এর জন্য লগ (এটি টার্মিনালে খেয়াল করবেন)
  console.log("--- Payment Attempt ---");
  console.log("User ID:", user?.id);
  console.log("Request Body:", req.body); 

  // ✅ ২. ডাটা না আসলে এরর হ্যান্ডলিং
  if (!ideaId) {
    return res.status(400).json({
      success: false,
      message: "Idea ID পাঠানো হয়নি। বডিতে 'ideaId' প্রপার্টি চেক করুন।"
    });
  }

  // ✅ ৩. সার্ভিস কল
  const paymentUrl = await paymentService.purchaseIdea(String(user.id), ideaId);
  
  res.status(200).json({ 
    success: true, 
    data: paymentUrl 
  });
});

export const handleSuccess = catchAsync(async (req: Request, res: Response) => {
  await paymentService.fulfillPayment(req.params.tranId as string);
  // .env এ FRONTEND_URL ঠিক আছে কি না নিশ্চিত হোন
  res.redirect(`${process.env.FRONTEND_URL}/success`);
});

export const handleFail = catchAsync(async (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/fail`);
});

export const handleCheckAccess = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const hasAccess = await paymentService.checkAccess(String(user.id), req.params.ideaId as string);
  res.status(200).json({ success: true, data: { hasAccess } });
});