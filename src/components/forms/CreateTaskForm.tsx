import { TaskPriority, TaskStatus } from '@prisma/client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { nlBE } from 'date-fns/locale';

const CreateTaskForm = () => {
  return (
    <>
      <FormField
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task name</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='text'
                name='name'
                placeholder='Go to the store'
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task description</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='text'
                name='name'
                placeholder='Buy milk'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='deadline'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Task deadline</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}>
                    {field.value ? (
                      format(field.value, 'dd/MM/yyyy', { locale: nlBE })
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='status'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task status</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={TaskStatus.BACKLOG}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(TaskStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name='priority'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task priority</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={TaskPriority.HIGH}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select priority' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(TaskPriority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CreateTaskForm;
