'use client';

import { PropsWithChildren, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useForm, DefaultValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodObject } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { FormResponse } from '@/types';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';

type FormProviderProps<T extends z.ZodObject<any, any>> = PropsWithChildren<{
  side?: 'left' | 'right';
  trigger: React.ReactNode;
  title: string;
  description: string;
  schema: T;
  defaultValues: DefaultValues<z.infer<T>>;
  handleSubmit: (data: z.infer<T>) => Promise<FormResponse>;
}>;

const FormProvider = <T extends ZodObject<any>>({
  children,
  side = 'right',
  trigger,
  title,
  description,
  schema,
  defaultValues,
  handleSubmit,
}: FormProviderProps<T>) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<T>) => {
    const response = await handleSubmit(data);
    console.log(response);

    if (response.type === 'success') {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader className='border-b'>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full my-2 space-y-4'>
            {children}
            <Separator />
            <div className='w-full flex flex-col space-y-2'>
              <Button
                className='w-full capitalize hover:underline focus:underline'
                variant={'outline'}
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}>
                Reset
              </Button>
              <Button
                className='w-full capitalize hover:underline focus:underline'
                disabled={form.formState.isSubmitting}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default FormProvider;
