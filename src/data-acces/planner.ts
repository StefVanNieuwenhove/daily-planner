'use server';

import prisma from '@/lib/prisma';
import { createPlannerSchema } from '@/lib/validation';
import { FormResponse, PlannerWithTasks } from '@/types';
import { useUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getPlanners = async (): Promise<PlannerWithTasks[] | null> => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }
    const planners = await prisma.planner.findMany({
      where: {
        userId: user.id,
      },
      include: {
        tasks: true,
      },
    });

    return planners;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPlannerByName = async (
  name: string
): Promise<PlannerWithTasks | null> => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const planner = await prisma.planner.findUnique({
      where: {
        name: name.toLowerCase(),
        userId: user.id,
      },
      include: {
        tasks: true,
      },
    });
    return planner;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPlanner = async ({
  name,
}: z.infer<typeof createPlannerSchema>): Promise<FormResponse> => {
  'use server';
  try {
    const user = await currentUser();

    if (!user) {
      return {
        type: 'error',
        message: 'You need to be logged in to create a planner',
      };
    }

    const exists = await prisma.planner.findFirst({
      where: {
        name: name.toLowerCase(),
        userId: user.id,
      },
    });

    if (exists) {
      return {
        type: 'error',
        message: 'A planner with this name already exists',
      };
    }

    await prisma.planner.create({
      data: {
        name: name.toLowerCase(),
        userId: user.id,
      },
    });

    revalidatePath('/planner');

    return {
      type: 'success',
      message: 'Planner created',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};

export const deletePlanner = async (id: string): Promise<FormResponse> => {
  try {
    const planner = await prisma.planner.findUnique({
      where: {
        id,
      },
    });

    if (!planner) {
      return {
        type: 'error',
        message: 'Planner not found',
      };
    }

    await prisma.planner.delete({
      where: {
        id,
      },
    });

    revalidatePath('/planner');

    return {
      type: 'success',
      message: 'Planner deleted',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};
