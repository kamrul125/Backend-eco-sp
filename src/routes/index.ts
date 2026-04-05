import { Router } from "express";

// মডিউল রাউটগুলো ইমপোর্ট করা হচ্ছে
import authRoutes from "../app/modules/auth/auth.route";
import { ideaRoutes } from "../app/modules/idea/idea.route";
import categoryRoutes from "../app/modules/category/category.route";
import voteRoutes from "../app/modules/vote/vote.route";
import paymentRoutes from "../app/modules/payment/payment.route";
import commentRoutes from "../app/modules/comment/comment.route";
import userRoutes from "../app/modules/user/user.route"; 

const router = Router();

// রাউটগুলোর জন্য একটি স্ট্রাকচার ইন্টারফেস
interface IModuleRoute {
  path: string;
  route: Router;
}

// মডিউলগুলোর লিস্ট
const moduleRoutes: IModuleRoute[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/ideas",
    route: ideaRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/votes",
    route: voteRoutes,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },
  {
    path: "/comments",
    route: commentRoutes,
  },
];

/**
 * লুপ চালিয়ে সব রাউট রেজিস্টার করা হচ্ছে।
 * এটি করার ফলে app.ts ফাইলটি ক্লিন থাকে।
 */
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;