'use client';

import { CreatePlannerForm, FormProvider } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createPlanner } from '@/data-acces/planner';
import { createPlannerSchema } from '@/lib/validation';
import { useUser } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

type PlannerLayoutProps = PropsWithChildren<{}>;

const PlannerLayout = ({ children }: PlannerLayoutProps) => {
  const { user } = useUser();
  return (
    <>
      <div className='flex items-center justify-between py-1'>
        <h2 className='text-2xl font-bold'>{user?.username}&apos; planners</h2>
        <FormProvider
          side='right'
          trigger={<Button className='capitalize'>Add planner</Button>}
          title='Create a new planner'
          description='Fill in the form below to create a new planner.'
          schema={createPlannerSchema}
          defaultValues={{
            name: '',
          }}
          handleSubmit={async (data) => {
            return await createPlanner(data);
          }}>
          <CreatePlannerForm />
        </FormProvider>
      </div>
      <Separator />
      {children}
    </>
  );
};

export default PlannerLayout;
