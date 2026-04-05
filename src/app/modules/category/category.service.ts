import { PrismaClient } from "@prisma/client";

// সরাসরি প্রিজমা ক্লায়েন্ট তৈরি করা হলো যাতে প্যাথ এরর (Cannot find module) না আসে
const prisma = new PrismaClient();

/**
 * ১. নতুন ক্যাটাগরি তৈরি করা (Admin only)
 */
export const createCategory = async (name: string, userId: string, role: string) => {
  // ডাটাবেসে নতুন ক্যাটাগরি সেভ করা হচ্ছে
  return await prisma.category.create({
    data: { 
      name 
    },
  });
};

/**
 * ২. সব ক্যাটাগরি গেট করা (আইডিয়া কাউন্টসহ)
 */
export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      // ক্যাটাগরির সাথে কয়টি আইডিয়া আছে তাও নিয়ে আসবে
      include: {
        _count: {
          select: { 
            ideas: true 
          } 
        }
      },
      // নামের ক্রমানুসারে সাজানো
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`✅ ${categories.length} categories found in database.`);
    return categories;
  } catch (error: any) {
    console.error("❌ Prisma Service Error (getAllCategories):", error.message);
    
    // কোনো কারণে রিলেশন কাউন্টে এরর দিলে শুধু ক্যাটাগরিগুলো পাঠাবে যাতে ফ্রন্টএন্ড না ভেঙে যায়
    try {
      return await prisma.category.findMany();
    } catch (finalError: any) {
      console.error("❌ Fatal Database Error:", finalError.message);
      return [];
    }
  }
};