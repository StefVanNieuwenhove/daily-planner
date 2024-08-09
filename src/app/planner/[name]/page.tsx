'use client';

import { Button } from '@/components/ui/button';
import {
  deletePlanner,
  getPlannerByName,
  updatePlannerName,
} from '@/data-acces/planners';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

type PlannerIdPageProps = {
  params: {
    name: string;
  };
};

const PlannerIdPage = ({ params }: PlannerIdPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkPlanner = async () => {
      const planner = await getPlannerByName(params.name);
      if (!planner) return router.push('/planner');
    };
    checkPlanner();
  });

  const updatePlannerNameHandler = useCallback(async () => {
    const plannerName = inputRef.current?.value;

    const response = await updatePlannerName(params.name, plannerName);
    if (response.status === 'success') {
      toast.success(response.message);
      return router.push('/planner');
    } else {
      toast.error(response.message);
    }
  }, [router, params.name]);

  const deletePlannerHandler = useCallback(async () => {
    const response = await deletePlanner(params.name);
    if (response.status === 'success') {
      toast.success(response.message);
      return router.push('/planner');
    } else {
      toast.error(response.message);
    }
  }, [params.name, router]);

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <h3 className='text-2xl font-bold uppercase pt-2 underline text-primary'>
          {params.name}
        </h3>
        <div className='flex gap-2'>
          {/* <Button size={'icon'} onClick={deletePlannerHandler}>
            <Trash className='w-5 h-5' />
          </Button>
          <Button size={'icon'}>
            <Edit className='w-5 h-5' />
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={'icon'}>
                <Trash className='w-5 h-5' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Deleting planner {params.name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this planner and remove it from your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deletePlannerHandler}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={'icon'}>
                <Edit className='w-5 h-5' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit planner {params.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  Change the name of this planner.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div>
                <label htmlFor='planner-name'>Name</label>
                <Input
                  ref={inputRef}
                  id='planner-name'
                  placeholder='Planner name'
                  autoFocus
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={updatePlannerNameHandler}>
                  Update
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default PlannerIdPage;
