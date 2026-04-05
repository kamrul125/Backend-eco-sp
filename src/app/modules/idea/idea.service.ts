import { prisma } from '../../../config/prisma';

export const createIdea = async (userId: string, data: any) => {
  return await prisma.idea.create({
    data: { ...data, authorId: userId, status: "DRAFT" },
  });
};

export const getAllIdeas = async (query: any) => {
  const { searchTerm, category } = query;
  return await prisma.idea.findMany({
    where: {
      status: "APPROVED",
      ...(searchTerm && { title: { contains: searchTerm as string, mode: 'insensitive' } }),
      ...(category && { category: { name: category as string } }),
    },
    include: { author: true, category: true }
  });
};

export const getIdeaById = async (id: string) => {
  return await prisma.idea.findUnique({ where: { id }, include: { author: true, category: true } });
};

export const updateIdea = async (userId: string, ideaId: string, data: any) => {
  return await prisma.idea.update({ where: { id: ideaId }, data });
};

export const deleteIdea = async (userId: string, userRole: string, ideaId: string) => {
  return await prisma.idea.delete({ where: { id: ideaId } });
};

export const approveIdea = async (ideaId: string) => {
  return await prisma.idea.update({ where: { id: ideaId }, data: { status: "APPROVED" } });
};

export const rejectIdea = async (ideaId: string, feedback: string) => {
  return await prisma.idea.update({
    where: { id: ideaId },
    data: { status: "REJECTED", description: { append: `\n\nFeedback: ${feedback}` } as any }
  });
};