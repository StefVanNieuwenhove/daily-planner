import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { Task, TaskPriority } from '@prisma/client';
import { mapPriortiesToColor, mapStatusToColor } from '@/lib/utils';
import { Badge } from '../ui/badge';

type TaskAccordionProps = {
  value: string;
  tasks: Task[];
  className?: string;
  defaultText?: string;
};

const TaskAccordion = ({
  value,
  tasks,
  className,
  defaultText,
}: TaskAccordionProps) => {
  return (
    <AccordionItem
      value={value}
      className='w-full max-h-[200px] overflow-y-scroll'>
      <AccordionTrigger asChild>
        <Button
          variant={'outline'}
          className={`${mapPriortiesToColor(
            value as TaskPriority
          )} w-full text-sm text-center text-ellipsis`}>
          HIGH - {tasks.length || 0}
        </Button>
      </AccordionTrigger>
      <AccordionContent className='ml-4 my-2 space-y-2 '>
        {tasks.length ? (
          tasks.map((task) => (
            <p key={task.id} className='tuncate'>
              {task.name} -{' '}
              <Badge
                variant={'outline'}
                className={`${mapStatusToColor(task.status)} text-ellipsis`}>
                {task.status}
              </Badge>
            </p>
          ))
        ) : (
          <span>{defaultText || 'No tasks'}</span>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default TaskAccordion;
