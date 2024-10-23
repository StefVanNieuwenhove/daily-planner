import { PropsWithChildren, ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type DeleteDialogProps = PropsWithChildren<{
  title: string;
  description: string;
  trigger: ReactNode;
  content?: ReactNode | string;
  handleDelete: () => Promise<void>;
}>;

const DeleteDialog = ({
  title,
  description,
  trigger,
  content,
  handleDelete,
}: DeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Separator />
        {content}
        <Separator />
        <DialogFooter className='w-full flex items-center justify-between'>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
