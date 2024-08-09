'use client';

import { Button } from '@/components/ui/button';
import { deletePlanner, getPlannerByName } from '@/data-acces/planners';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { toast } from 'sonner';

type PlannerIdPageProps = {
  params: {
    id: string;
  };
};

const PlannerIdPage = ({ params }: PlannerIdPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkPlanner = async () => {
      const planner = await getPlannerByName(params.id);
      if (!planner) return router.push('/planner');
    };
    checkPlanner();
  });

  const deletePlannerHandler = async () => {
    const response = await deletePlanner(params.id);
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
        <div className='flex gap-2'>
          <Button size={'icon'} onClick={deletePlannerHandler}>
            <Trash className='w-5 h-5' />
          </Button>
          <Button size={'icon'}>
            <Edit className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlannerIdPage;
