import { Task } from '@prisma/client';

export type TaskWithPlanner = Task & {
  planner: {
    name: string;
  };
};

export type TaskByPlanner = {
  [plannerName: string]: Task[];
};
