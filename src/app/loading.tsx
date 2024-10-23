import { Spinner } from '@/components';
import React from 'react';

const loading = () => {
  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
      <Spinner />
    </section>
  );
};

export default loading;
