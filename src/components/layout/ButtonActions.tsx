'use client';

import React, { useCallback, useRef } from 'react';

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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FormResponse } from '@/types/task';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type ButtonActionsProps = {
  plannerName: string;
  type: 'create' | 'edit' | 'delete';
  title: string;
  description: string;
  action: {
    handler: (oldName: string, newName?: string) => Promise<FormResponse>;
    text: string;
    redirect: string;
  };
  icon?: React.ReactNode;
};

const ButtonActions = ({
  plannerName,
  type,
  title,
  description,
  action,
  icon,
}: ButtonActionsProps) => {
  const valueRef = useRef<HTMLInputElement>(null);
  const createRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handle = useCallback(async () => {
    let result: FormResponse = {
      status: 'error',
      message: 'default error',
    };
    switch (type) {
      case 'create':
        console.log(valueRef.current?.value);
        result = await action.handler(plannerName, valueRef.current?.value);
        break;
      case 'edit':
        result = await action.handler(plannerName, valueRef.current?.value);
        break;
      case 'delete':
        result = await action.handler(plannerName);
        break;
      default:
        break;
    }
    if (result.status === 'success') {
      toast.success(result.message);
      return router.push(action.redirect);
    } else {
      toast.error(result.message);
    }
  }, [action, type, plannerName, router]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={'icon'}>{icon}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {type === 'edit' && (
          <>
            <label htmlFor='planner-name'>Planner name</label>
            <Input
              ref={valueRef}
              id='planner-name'
              placeholder='Planner name'
              autoFocus
            />
          </>
        )}
        {type === 'create' && (
          <>
            <label htmlFor='task-name'>Task name</label>
            <Input
              ref={valueRef}
              id='task-name'
              placeholder='Taks name'
              autoFocus
            />
          </>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handle}>{action.text}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonActions;
