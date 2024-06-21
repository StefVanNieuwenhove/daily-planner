import { AddPlannerForm } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FolderOpenIcon } from 'lucide-react';
import { addPlanner } from './action';
import prisma from '@/lib/prisma';
import { getUser } from '@/lib/auth';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

type PlannerLayoutProps = {
  children: React.ReactNode;
};

const PlannerLayout = async ({ children }: PlannerLayoutProps) => {
  const planners = await prisma.planner.findMany({
    where: { userId: getUser() as string },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={11} className='flex'>
          <section className='h-full w-max flex flex-col gap-2 items-start px-4'>
            <h2 className='text-xl font-bold underline'>My Planners</h2>
            <aside className='flex flex-col gap-2 text-sm'>
              <AddPlannerForm handleSubmit={addPlanner} />
              <Separator />
              {planners.map((planner) => (
                <Button
                  key={planner.id}
                  className='flex items-center justify-center gap-2'>
                  <span className='flex items-center justify-center gap-1'>
                    <FolderOpenIcon className='w-4 h-4' />
                    {planner.name}
                  </span>
                </Button>
              ))}
            </aside>
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default PlannerLayout;
