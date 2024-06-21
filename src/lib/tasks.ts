import { TaskByPlanner, TaskWithPlanner } from '@/type/task';

export const taskByPlanner = (tasks: TaskWithPlanner[]) => {
  return tasks.reduce((acc: TaskByPlanner, task: TaskWithPlanner) => {
    const plannerName = task.planner.name;
    if (!acc[plannerName]) {
      acc[plannerName] = [];
    }
    acc[plannerName].push(task);
    return acc;
  }, {} as TaskByPlanner);
};
