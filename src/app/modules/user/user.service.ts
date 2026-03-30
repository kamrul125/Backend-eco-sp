import { prisma } from "../../../config/prisma";

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // পাসওয়ার্ড বাদ দিয়ে বাকি সব ডাটা আসবে
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
};

export const userService = {
  getMyProfile,
};