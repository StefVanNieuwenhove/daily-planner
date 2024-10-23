import { PlannerCard } from '@/components';
import { getPlanners } from '@/data-acces/planner';
import React from 'react';

const PlannerPage = async () => {
  const planners = await getPlanners();

  if (!planners) {
    return <div>No planners found</div>;
  }

  return (
    <section className='w-full my-2 flex space-x-4 flex-wrap '>
      {planners?.map((planner) => (
        <PlannerCard key={planner.id} planner={planner} className='w-fit' />
      ))}
    </section>
  );
};

export default PlannerPage;
