'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn, upperCaseFirst } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Search, Trash } from 'lucide-react';
import { PlannerWithTasks } from '@/types';
import { DeleteDialog } from '../forms';
import { deletePlanner } from '@/data-acces/planner';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Task, TaskPriority, TaskStatus } from '@prisma/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskAccordion } from '../accordions';

type PlannerCardProps = {
  planner: PlannerWithTasks;
  className?: string;
};

const PlannerCard = ({ planner, className }: PlannerCardProps) => {
  const handleDelete = async () => {
    const response = await deletePlanner(planner.id);

    if (response.type === 'success') {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // group the tasks by priority
  const priorities = planner.tasks.reduce(
    (acc: Record<TaskPriority, Task[]>, task) => {
      if (!acc[task.priority]) {
        acc[task.priority] = [];
      }

      acc[task.priority].push(task);

      return acc;
    },
    {
      HIGH: [],
      MEDIUM: [],
      LOW: [],
    } as Record<TaskPriority, Task[]>
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='border-b pt-4 pb-3 space-y-3'>
        <CardTitle className='text-center underline'>
          {upperCaseFirst(planner.name)}
        </CardTitle>
        <CardDescription className='text-gray-600 text-sm'>
          Tasks: {planner.tasks.length}
        </CardDescription>
      </CardHeader>
      <CardContent className='border-b py-2'>
        <Accordion type='multiple' className='space-y-2'>
          <TaskAccordion
            value='HIGH'
            tasks={priorities.HIGH}
            defaultText='No tasks with high priority'
          />
          <TaskAccordion
            value='MEDIUM'
            tasks={priorities.MEDIUM}
            defaultText='No tasks with medium priority'
          />
          <TaskAccordion
            value='LOW'
            tasks={priorities.LOW}
            defaultText='No tasks with low priority'
          />
        </Accordion>
      </CardContent>
      <CardFooter className='w-full py-2 flex items-center justify-between space-x-2'>
        <DeleteDialog
          trigger={
            <Button variant={'destructive'} className='w-full'>
              <Trash className='w-4 h-4' />
            </Button>
          }
          title={`Delete planner - ${planner.name}`}
          description='Are you sure you want to delete this planner?'
          handleDelete={handleDelete}
          content={
            <div>
              <span>This planner has {planner.tasks.length} tasks</span>
            </div>
          }
        />
        <Button className='w-full' asChild>
          <Link href={`/planner/${planner.name}`}>
            <Search className='w-4 h-4' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlannerCard;

{
  /* <Accordion type='single' collapsible className='space-y-2'>
            {Object.entries(priorities).map(([priority, tasks]) => (
              <AccordionItem key={priority} value={priority}>
                <AccordionTrigger>
                  <Badge
                    variant={'outline'}
                    className={`${mapPriortiesToColor(
                      priority as TaskPriority
                    )} w-full text-sm text-center`}>
                    {priority} - {tasks.length}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className='ml-4 space-y-2 max-h-1/2 overflow-y-auto'>
                  {tasks.map((task) => (
                    <p key={task.id} className='tuncate'>
                      {task.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion> */
}
