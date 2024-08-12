'use client';

import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  Draggable,
} from 'react-beautiful-dnd';
import { Task, TaskStatus } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useCallback, useState } from 'react';
import { formatDate } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type KanbanTasksProps = {
  tasks: Task[];
};

const TASKS_STATUS = [
  'BACKLOG',
  'PLANNING',
  'IN_PROGRESS',
  'PAUSED',
  'COMPLETED',
  'CANCELLED',
];

const KanbanTasks = ({ tasks }: KanbanTasksProps) => {
  const handleStatusChange = (status: string) => {
    console.log(status);
  };
  return (
    <>
      <div className='flex w-full justify-between gap-2'>
        {TASKS_STATUS.map((status) => (
          <div key={status} className='flex flex-col gap-2'>
            <h4 className='text-lg font-bold uppercase underline text-center'>
              {status.replace('_', ' ').toUpperCase()}
            </h4>
            <div className='flex gap-2'>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <CardTitle>{task.name}</CardTitle>
                      <CardDescription>
                        {formatDate(task.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Priority: {task.priority}</p>
                      <Select onValueChange={handleStatusChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={task.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {TASKS_STATUS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.replace('_', ' ').toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanTasks;
