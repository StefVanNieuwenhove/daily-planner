'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPlannerValidation } from '@/lib/validation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { addPlanner } from '@/data-acces/planners';

const AddPlannerForm = () => {
  const form = useForm<z.infer<typeof addPlannerValidation>>({
    resolver: zodResolver(addPlannerValidation),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof addPlannerValidation>) => {
    try {
      const result = await addPlanner(data.name);
      if (result.status === 'error') {
        toast.error(result.message);
      } else {
        toast.success(result.message);
      }
      form.reset();
    } catch (error) {
      toast.error('Failed to create a new planner');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs'>Create a new planner</FormLabel>
              <FormControl>
                <Input placeholder='Planner name' {...field} />
              </FormControl>
              <FormDescription className='text-xs'></FormDescription>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <Button type='submit' variant={'outline'} className='w-full mb-1'>
          Add Planner
        </Button>
        <Button
          type='reset'
          variant={'outline'}
          onClick={() => form.reset()}
          className='w-full'>
          Clear
        </Button>
      </form>
    </Form>
  );
};

export default AddPlannerForm;
