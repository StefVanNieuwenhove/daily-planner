'use client';
import * as React from 'react';
import { ChevronsUpDown, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';

type ComboboxProps = {
  options: {
    value: string;
    id: string;
  }[];
};

const Combobox = ({ options }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {selected
            ? options.find((option) => option.id === selected)?.value
            : 'Overview'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandEmpty>No planners found.</CommandEmpty>
            <CommandGroup>
              {options
                .sort((a, b) => a.value.localeCompare(b.value))
                .map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={(currentValue) => {
                      setSelected(
                        currentValue === option.value ? selected : currentValue
                      );
                      setOpen(false);
                      if (currentValue === 'overview') {
                        router.push('/planner');
                      } else {
                        router.push(`/planner/${option.value.toLowerCase()}`);
                      }
                    }}>
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selected === option.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.value}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
