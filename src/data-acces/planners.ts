import prisma from '@/lib/prisma';
import { PlannerWithTasks } from '@/types/task';
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

export const addPlanner = async (name: string) => {
  'use server';

  try {
    if (!name) return;
    if (!getUser()) return redirect('/login');
    await prisma.planner.create({
      data: {
        name,
        userId: getUser() || '',
      },
    });
  } catch (error) {
    throw new Error('Failed to create a new planner');
  }

  revalidatePath('/planner');
};
