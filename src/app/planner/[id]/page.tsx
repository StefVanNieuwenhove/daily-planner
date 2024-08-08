import { Button } from '@/components/ui/button';
import React from 'react';

type PlannerIdPageProps = {
  params: {
    id: string;
  };
};

const PlannerIdPage = ({ params }: PlannerIdPageProps) => {
  return (
    <>
      <Button>{params.id}</Button>
    </>
  );
};

export default PlannerIdPage;
