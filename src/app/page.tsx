'use client';

import { Button } from '@/components/ui/button';
import Combobox from '@/components/ui/combobox';
import { toast } from 'sonner';

export default function Home() {
  return (
    <>
      <Button onClick={() => toast.success('Hello world')}>Hello stefan</Button>
      <Combobox options={['next.js', 'sveltekit', 'nuxt.js']} />
    </>
  );
}
