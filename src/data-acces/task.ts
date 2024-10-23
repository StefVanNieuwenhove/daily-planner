import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { Task } from '@prisma/client';

export const getTaksByPlanner = async (
  planner: string
): Promise<Task[] | null> => {
  try {
    const user = await currentUser();

    if (!user) return null;

    return await prisma.task.findMany({
      where: {
        planner: {
          name: planner,
        },
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
