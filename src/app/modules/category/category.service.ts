import { prisma } from "../../../config/prisma";

// ক্যাটাগরি তৈরি করা (এখানে ৩টি আর্গুমেন্ট দিয়েছি উদাহরণ হিসেবে যদি আপনার এরর অনুযায়ী প্রয়োজন হয়)
// যদি শুধু নাম লাগে তবে (name: string) রাখুন
export const createCategory = async (name: string, userId: string, role: string) => {
  // এডমিন চেক বা অন্য লজিক এখানে থাকতে পারে
  return await prisma.category.create({
    data: { name },
  });
};

// এই ফাংশনের নাম 'getCategories' এর বদলে 'getAllCategories' করে দিন 
// যাতে কন্ট্রোলারের সাথে ম্যাচ করে
export const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { ideas: true } // কতগুলো আইডিয়া আছে তা দেখার জন্য
      }
    }
  });
};