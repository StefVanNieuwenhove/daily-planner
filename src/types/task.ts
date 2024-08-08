import { Planner, Task } from '@prisma/client';

export type PlannerWithTasks = Planner & {
  tasks: Task[];
};
