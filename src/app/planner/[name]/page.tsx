import { getPlannerByName } from '@/data-acces/planner';
import { getTaksByPlanner } from '@/data-acces/task';
import { redirect } from 'next/navigation';

type PlannerIdPageProps = {
  params: {
    name: string;
  };
};

const PlannerIdPage = async ({ params }: PlannerIdPageProps) => {
  const planner = await getTaksByPlanner(params.name);

  if (!planner) redirect('/planner');
  return <div>page - {params.name}</div>;
};

export default PlannerIdPage;
