'use server';

import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FormResponse } from '@/types/task';
import { revalidatePath } from 'next/cache';
import { convertToPriority, convertToStatus } from '@/lib/utils';

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

export const createTask = async (
  plannerName: string,
  name: string | undefined
): Promise<FormResponse> => {
  'use server';
  try {
    if (!name) return { status: 'error', message: 'Name is required' };
    if (!plannerName)
      return { status: 'error', message: 'Planner is required' };
    if (!getUser()) redirect('/login');

    /* const regex = /^[a-zA-Z0-9-_]+$/;
    if (!regex.test(name)) return { status: 'error', message: 'Invalid name' }; */

    const planner = await prisma.planner.findFirst({
      where: {
        name: plannerName.trim().toLowerCase(),
        userId: getUser() || '',
      },
    });

    if (!planner) return { status: 'error', message: 'Planner not found' };

    const task = await prisma.task.create({
      data: {
        name: name.trim().toLowerCase(),
        plannerId: planner.id,
        userId: getUser() || '',
        status: 'BACKLOG',
        priority: 'LOW',
      },
    });

    if (!task) return { status: 'error', message: 'Error creating task' };

    revalidatePath(`/planner/${plannerName}`);
    return { status: 'success', message: 'Task created successfully' };
  } catch (error) {
    return { status: 'error', message: 'Error creating task' };
  }
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<FormResponse> => {
  'use server';

  try {
    if (!status) return { status: 'error', message: 'Status is required' };
    if (!getUser()) redirect('/login');

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: getUser() || '',
      },
    });

    if (!task) return { status: 'error', message: 'Task not found' };

    await prisma.task.update({
      where: {
        id: taskId,
        userId: getUser() || '',
      },
      data: {
        status: convertToStatus(status.trim()),
      },
    });
    revalidatePath(`/planner`);
    return { status: 'success', message: 'Task status updated successfully' };
  } catch (error) {
    return { status: 'error', message: 'Failed to update the task status' };
  }
};

export const updateTaskPriority = async (
  taskId: string,
  priority: string
): Promise<FormResponse> => {
  'use server';

  try {
    if (!priority) return { status: 'error', message: 'Priority is required' };
    if (!getUser()) redirect('/login');

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: getUser() || '',
      },
    });

    if (!task) return { status: 'error', message: 'Task not found' };

    await prisma.task.update({
      where: {
        id: taskId,
        userId: getUser() || '',
      },
      data: {
        priority: convertToPriority(priority.trim()),
      },
    });
    revalidatePath(`/planner`);
    return { status: 'success', message: 'Task priority updated successfully' };
  } catch (error) {
    return { status: 'error', message: 'Failed to update the task priority' };
  }
};
