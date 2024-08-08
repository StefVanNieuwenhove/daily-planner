'use server';

import prisma from '@/lib/prisma';
import { FormResponse, PlannerWithTasks } from '@/types/task';
import { Planner } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const getPlanners = async (): Promise<Planner[]> => {
  try {
    const user = getUser() as string;
    if (!user) redirect('/login');
    return await prisma.planner.findMany({
      where: { userId: user },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw new Error('Failed to get planners');
  }
};

export const getPlannerWithTasks = async (): Promise<PlannerWithTasks[]> => {
  try {
    const user = getUser() as string;
    if (!user) redirect('/login');
    return await prisma.planner.findMany({
      where: { userId: user },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tasks: true,
      },
    });
  } catch (error) {
    throw new Error('Failed to get planners with tasks');
  }
};

export const addPlanner = async (name: string): Promise<FormResponse> => {
  'use server';

  try {
    if (!name) return { status: 'error', message: 'Name is required' };
    if (!getUser()) redirect('/login');

    if (
      await prisma.planner.findFirst({
        where: { name: name.trim().toLowerCase() },
      })
    ) {
      return { status: 'error', message: 'Planner already exists' };
    }

    await prisma.planner.create({
      data: {
        name: name.trim().toLowerCase(),
        userId: getUser() || '',
      },
    });
    revalidatePath('/planner');
    return { status: 'success', message: 'Planner created successfully' };
  } catch (error) {
    return { status: 'error', message: 'Failed to create a new planner' };
  }
};
