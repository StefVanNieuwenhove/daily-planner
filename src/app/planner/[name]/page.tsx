import { getTaksByPlanner } from '@/data-acces/task';
import { redirect } from 'next/navigation';

type PlannerNamePageProps = {
  params: {
    name: string;
  };
};

const PlannerNamePage = async ({ params }: PlannerNamePageProps) => {
  const tasks = await getTaksByPlanner(params.name);

  if (!tasks) redirect('/planner');
  return (
    <article>
      {tasks.map((task) => (
        <p key={task.id}>{task.name}</p>
      ))}
    </article>
  );
};

export default PlannerNamePage;
