'use server';

import prisma from '@/lib/prisma';
import { createTaskSchema } from '@/lib/validation';
import { FormResponse } from '@/types';
import { currentUser } from '@clerk/nextjs/server';
import { Task } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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

export const createTask = async (
  data: z.infer<typeof createTaskSchema>,
  plannerName: string
): Promise<FormResponse> => {
  try {
    const user = await currentUser();

    if (!user) return { type: 'error', message: 'No user found' };

    const planner = await prisma.planner.findUnique({
      where: {
        name: plannerName,
        userId: user.id,
      },
    });

    if (!planner) return { type: 'error', message: 'No planner found' };

    const task = await prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        status: data.status,
        priority: data.priority,
        userId: user.id,
        plannerId: planner.id,
      },
    });

    revalidatePath(`/planner/${plannerName}`);

    return {
      type: 'success',
      message: 'Task added',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};
