import { Planner, Task } from '@prisma/client';

export type PlannerWithTasks = Planner & {
  tasks: Task[];
};

export type FormResponse = {
  status: 'success' | 'error';
  message: string;
};
