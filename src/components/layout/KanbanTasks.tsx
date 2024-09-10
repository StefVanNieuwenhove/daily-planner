'use client';

import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
  Draggable,
} from 'react-beautiful-dnd';
import { Task } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { formatDate } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { updateTaskPriority, updateTaskStatus } from '@/data-acces/tasks';
import { toast } from 'sonner';

type KanbanTasksProps = {
  tasks: Task[];
  handleStatusChange: (status: string, taskId: string) => void;
  handlePriorityChange: (priority: string, taskId: string) => void;
};

const TASKS_STATUS = [
  'BACKLOG',
  'PLANNING',
  'IN_PROGRESS',
  'PAUSED',
  'COMPLETED',
  'CANCELLED',
];

const PRIORITY = ['LOW', 'MEDIUM', 'HIGH'];

const KanbanTasks = ({ tasks }: KanbanTasksProps) => {
  const handleUpdateTaskStatus = async (status: string, taskId: string) => {
    try {
      const result = await updateTaskStatus(taskId, status);
      if (result.status === 'success') {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleUpdateTaskPriority = async (priority: string, taskId: string) => {
    try {
      const result = await updateTaskPriority(taskId, priority);
      if (result.status === 'success') {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to update task priority');
    }
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
                      <div>
                        <label>Priority</label>
                        <Select
                          onValueChange={(value) =>
                            handleUpdateTaskPriority(value, task.id)
                          }
                          name='status'>
                          <SelectTrigger>
                            <SelectValue placeholder={task.priority} />
                          </SelectTrigger>
                          <SelectContent>
                            {PRIORITY.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.replace('_', ' ').toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label>Status</label>
                        <Select
                          onValueChange={(value) =>
                            handleUpdateTaskStatus(value, task.id)
                          }
                          name='status'>
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
                      </div>
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
