import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { taskByPlanner } from '@/lib/tasks';
import { TaskWithPlanner } from '@/type/task';
import { Task } from '@prisma/client';

const PlannerPage = async () => {
  const tasks: TaskWithPlanner[] = await prisma.task.findMany({
    where: { userId: getUser() as string },
    include: {
      planner: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <section className='container'>
        <Accordion type='multiple'>
          {Object.entries(taskByPlanner(tasks)).map(([plannerName, tasks]) => (
            <AccordionItem
              key={plannerName}
              title={plannerName}
              value={plannerName}>
              <AccordionTrigger>{plannerName}</AccordionTrigger>
              <AccordionContent>
                {tasks.map((task) => (
                  <div key={task.id} className='flex items-center gap-2'>
                    <span className='text-sm'>{task.name}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
};

export default PlannerPage;
