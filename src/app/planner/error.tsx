'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-semibold'>Something went wrong!</h2>
      <p className='tuncate'>{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </Button>
    </div>
  );
}
