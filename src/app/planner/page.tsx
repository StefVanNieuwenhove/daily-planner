import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const PlannerPage = async () => {
  const tasks = await prisma.task.findMany({
    where: { userId: getUser() as string },
  });

  return <div>PlannerPage</div>;
};

export default PlannerPage;
