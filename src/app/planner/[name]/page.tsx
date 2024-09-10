import {
  deletePlanner,
  updatePlannerName,
  getPlannerByName,
} from '@/data-acces/planners';
import { Edit, FileCheck2, Trash } from 'lucide-react';
import { ButtonActions, DragDropTasks, KanbanTasks } from '@/components/layout';
import { redirect } from 'next/navigation';
import {
  createTask,
  getTasksByPlannerName,
  updateTaskPriority,
  updateTaskStatus,
} from '@/data-acces/tasks';
import { toast } from 'sonner';

type PlannerIdPageProps = {
  params: {
    name: string;
  };
};

const PlannerNamePage = async ({ params }: PlannerIdPageProps) => {
  const planner = await getPlannerByName(params.name);
  const tasks = await getTasksByPlannerName(params.name);
  if (!planner) redirect('/planner');

  return (
    <>
      <article className='flex items-center justify-between gap-2'>
        <h3 className='text-2xl font-bold uppercase pt-2 underline text-primary'>
          {params.name}
        </h3>
        <div className='flex gap-2'>
          <ButtonActions
            plannerName={params.name}
            type='create'
            title='Create task'
            description='Create a new task for this planner.'
            action={{
              handler: createTask,
              text: 'create',
              redirect: `/planner/${params.name}`,
            }}
            icon={<FileCheck2 className='w-5 h-5' />}
          />
          <ButtonActions
            plannerName={params.name}
            type='delete'
            title='Deleting planner'
            description='This action cannot be undone. This will permanently delete this planner and remove it from your account.'
            action={{
              handler: deletePlanner,
              text: 'Delete',
              redirect: '/planner',
            }}
            icon={<Trash className='w-5 h-5' />}
          />
          <ButtonActions
            plannerName={params.name}
            type='edit'
            title='Edit planner'
            description='Change the name of this planner.'
            action={{
              handler: updatePlannerName,
              text: 'Update',
              redirect: `/planner`,
            }}
            icon={<Edit className='w-5 h-5' />}
          />
        </div>
      </article>
      <article className='mt-3'>
        {/*  <DragDropTasks tasks={tasks} />*/}
        <KanbanTasks tasks={tasks} />
      </article>
    </>
  );
};

export default PlannerNamePage;
