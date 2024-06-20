import { AddPlannerForm } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { auth } from '@clerk/nextjs/server';
import { FolderOpenIcon } from 'lucide-react';
import { addPlanner } from './action';
import prisma from '@/lib/prisma';

type PlannerLayoutProps = {
  children: React.ReactNode;
};

const PlannerLayout = async ({ children }: PlannerLayoutProps) => {
  const planners = await prisma.planner.findMany();
  const { userId } = auth();

  return (
    <>
      <section className='h-full w-max flex flex-col gap-2 items-start px-4'>
        <h2 className='text-xl font-bold underline'>My Planners</h2>
        <aside className='flex flex-col gap-2 text-sm'>
          <AddPlannerForm handleSubmit={addPlanner} />
          <Separator />
          {planners.map((planner) => (
            <Button key={planner.id} className='flex items-center gap-2'>
              <span>
                <FolderOpenIcon className='w-4 h-4' />
              </span>
              {planner.name}
            </Button>
          ))}
        </aside>
      </section>
      <Separator orientation='vertical' />
      <section>{children}</section>
    </>
  );
};

export default PlannerLayout;
