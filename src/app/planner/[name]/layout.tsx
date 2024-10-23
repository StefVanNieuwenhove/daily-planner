'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ListCollapse, SquareKanban } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateTaskForm, FormProvider } from '@/components';
import { createTaskSchema } from '@/lib/validation';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { createTask } from '@/data-acces/task';

type PlannernameLayoutProps = PropsWithChildren<{
  params: {
    name: string;
  };
}>;

const PlannerNameLayout = ({ params, children }: PlannernameLayoutProps) => {
  const [value, setValue] = useState<'kanban' | 'accordion'>('kanban');
  return (
    <>
      <article className='w-full flex items-center justify-between my-2'>
        <ToggleGroup
          type='single'
          value={value}
          className='border border-primary rounded-md'>
          <ToggleGroupItem
            value='kanban'
            onClick={() => setValue('kanban')}
            asChild>
            <Link href={`/planner/${params.name}`}>
              <SquareKanban />
            </Link>
          </ToggleGroupItem>
          <ToggleGroupItem
            value='accordion'
            onClick={() => setValue('accordion')}
            asChild>
            <Link href={`/planner/${params.name}`}>
              <ListCollapse />
            </Link>
          </ToggleGroupItem>
        </ToggleGroup>
        <FormProvider
          side='right'
          trigger={<Button>Add task</Button>}
          title='Add task'
          description={`Add a new task to your planner - ${params.name}`}
          schema={createTaskSchema}
          defaultValues={{
            name: '',
            description: '',
            deadline: new Date(),
            status: TaskStatus.BACKLOG,
            priority: TaskPriority.LOW,
          }}
          handleSubmit={async (data) => {
            return await createTask(data, params.name);
          }}>
          <CreateTaskForm />
        </FormProvider>
      </article>
      {children}
    </>
  );
};

export default PlannerNameLayout;
