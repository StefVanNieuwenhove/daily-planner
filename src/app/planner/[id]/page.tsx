'use client';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deletePlanner } from '@/data-acces/planners';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type PlannerIdPageProps = {
  params: {
    id: string;
  };
};

const PlannerIdPage = ({ params }: PlannerIdPageProps) => {
  const router = useRouter();

  const deletePlannerHandler = async (name: string) => {
    const response = await deletePlanner(name);
    if (response.status === 'success') {
      toast.success(response.message);
      return router.push('/planner');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <h3 className='text-2xl font-bold uppercase pt-2 underline text-primary'>
          {params.id}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <Settings className='w-5 h-5 text-primary' />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Edit</ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => deletePlannerHandler(params.id)}>
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Right click to access the settings menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

export default PlannerIdPage;
