import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

/**
 * ১. নতুন ক্যাটাগরি তৈরি করা (Admin only)
 */
export const createCategory = async (name: string, userId: string, role: string) => {

  return await prisma.category.create({
    data: { 
      name 
    },
  });
};


export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      
      include: {
        _count: {
          select: { 
            ideas: true 
          } 
        }
      },
   
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`✅ ${categories.length} categories found in database.`);
    return categories;
  } catch (error: any) {
    console.error("❌ Prisma Service Error (getAllCategories):", error.message);
    
   
    try {
      return await prisma.category.findMany();
    } catch (finalError: any) {
      console.error("❌ Fatal Database Error:", finalError.message);
      return [];
    }
  }
};