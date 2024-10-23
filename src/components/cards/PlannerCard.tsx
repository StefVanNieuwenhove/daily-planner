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
        {planner.tasks.length ? (
          planner.tasks.map((task) => (
            <div key={task.id}>
              <p>{task.name}</p>
            </div>
          ))
        ) : (
          <span>This planner doesn&apos;t have tasks</span>
        )}
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
