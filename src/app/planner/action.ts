import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const addPlanner = async (name: string) => {
  'use server';
  console.log(name);
  try {
    if (!name) return;
    if (!getUser()) return;
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
