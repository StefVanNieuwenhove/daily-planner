import { AddPlannerForm } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FolderOpenIcon } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Link from 'next/link';
import Combobox from '@/components/ui/combobox';
import { getPlanners } from '@/data-acces/planners';
import { Planner } from '@prisma/client';
import { upperCaseFirst } from '@/lib/utils';

type PlannerLayoutProps = {
  children: React.ReactNode;
};

const PlannerLayout = async ({ children }: PlannerLayoutProps) => {
  const planners: Planner[] = await getPlanners();

  return (
    <>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={11} maxSize={16} className='flex'>
          <section className='h-full w-max flex flex-col gap-2 items-start px-4'>
            <h2 className='text-xl font-bold underline'>
              <Link href={'/planner'}>My Planners</Link>
            </h2>
            <aside className='flex flex-col gap-2 text-sm'>
              <AddPlannerForm />
              <Separator />
              {planners.length > 0 ? (
                planners.map((planner) => (
                  <Button
                    asChild
                    key={planner.id}
                    className='flex items-center justify-center gap-2'>
                    <Link href={`/planner/${planner.name}`}>
                      <span className='flex items-center justify-center gap-1'>
                        <FolderOpenIcon className='w-4 h-4' />
                        {upperCaseFirst(planner.name)}
                      </span>
                    </Link>
                  </Button>
                ))
              ) : (
                <span>No planners found</span>
              )}
            </aside>
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <section className='container mx-auto flex flex-col gap-2'>
            <div>
              <Combobox
                options={planners
                  .map((planner) => ({
                    value: planner.name,
                    id: planner.id,
                  }))
                  .concat({ value: 'Overview', id: 'overview' })}
              />
            </div>
            <div>{children}</div>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default PlannerLayout;
