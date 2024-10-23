import { Task, Planner } from '@prisma/client';

export type FormResponse = {
  type: 'success' | 'error';
  message: string;
};

export type PlannerWithTasks = Planner & {
  tasks: Task[];
};
