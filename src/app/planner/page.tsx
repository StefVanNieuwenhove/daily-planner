import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { getPlannerWithTasks } from '@/data-acces/planners';
import { upperCaseFirst } from '@/lib/utils';
import Link from 'next/link';

const PlannerPage = async () => {
  const planners = await getPlannerWithTasks();

  return (
    <>
      <Accordion type='multiple'>
        {planners.map((planner) => (
          <AccordionItem
            key={planner.id}
            title={planner.name}
            value={planner.id}>
            <AccordionTrigger>{upperCaseFirst(planner.name)}</AccordionTrigger>
            <AccordionContent>
              {planner.tasks.length > 0 ? (
                planner.tasks.map((task) => (
                  <div key={task.id}>{task.name}</div>
                ))
              ) : (
                <span>
                  No tasks found,{' '}
                  <Link href={`/planner/${planner.name}`} className='underline'>
                    add some!
                  </Link>
                </span>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default PlannerPage;
