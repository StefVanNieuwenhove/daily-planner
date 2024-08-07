import React from 'react';

type PlannerIdPageProps = {
  params: {
    id: string;
  };
};

const PlannerIdPage = ({ params }: PlannerIdPageProps) => {
  return <div>page {params.id}</div>;
};

export default PlannerIdPage;
