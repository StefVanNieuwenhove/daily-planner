import { TaskPriority, TaskStatus } from '@prisma/client';
import { z } from 'zod';

export const createPlannerSchema = z.object({
  name: z.string().min(3),
});

export const createTaskSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  deadline: z.date().min(new Date()),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
});
