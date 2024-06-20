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

type AddPlannerFormProps = {
  handleSubmit: (name: string) => void;
};

const AddPlannerForm = ({ handleSubmit }: AddPlannerFormProps) => {
  const form = useForm<z.infer<typeof addPlannerValidation>>({
    resolver: zodResolver(addPlannerValidation),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof addPlannerValidation>) => {
    try {
      await handleSubmit(data.name);
      form.reset();
    } catch (error) {
      console.error(error);
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
        <Button type='submit' variant={'outline'} className='w-full'>
          Add Planner
        </Button>
      </form>
    </Form>
  );
};

export default AddPlannerForm;
