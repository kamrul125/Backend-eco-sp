import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config"; // আপনার config/index.ts থেকে ইমপোর্ট হচ্ছে

const auth = (...roles: string[]) => {
  // টাইপস্ক্রিপ্ট এরর এড়াতে 'req: any' ব্যবহার করা হয়েছে ✅
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      // ১. টোকেন আছে কি না চেক করা
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // ২. যদি টোকেন "Bearer <token>" ফরম্যাটে থাকে তবে শুধু টোকেনটুকু নেওয়া
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      // ৩. টোকেন ভেরিফাই করা (config ফাইলে নাম jwt_access_secret হতে হবে)
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string 
      ) as JwtPayload;

      const { role } = decoded;

      // ৪. রোল চেক করার লজিক (যদি রাউটে রোল দেওয়া থাকে)
      if (roles.length && !roles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have permission to perform this action",
        });
      }

      // ৫. রিকোয়েস্ট অবজেক্টে ইউজার সেট করা
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or expired!",
      });
    }
  };
};

// এটি নিশ্চিত করবে যে অন্য ফাইলগুলো 'import auth from ...' হিসেবে এটি পাবে ✅
export default auth;