import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getPlannerWithTasks } from '@/data-acces/planners';

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
            <AccordionTrigger>{planner.name}</AccordionTrigger>
            <AccordionContent>
              {planner.tasks.map((task) => (
                <div key={task.id}>{task.name}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default PlannerPage;
