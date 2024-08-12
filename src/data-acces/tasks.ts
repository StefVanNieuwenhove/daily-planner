'use server';

import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const getTasksByPlannerName = async (name: string): Promise<Task[]> => {
  try {
    const user = getUser() as string;
    if (!user) redirect('/login');
    return await prisma.task.findMany({
      where: { planner: { name: name.trim().toLowerCase(), userId: user } },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    return [];
  }
};
