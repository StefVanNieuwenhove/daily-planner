import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <header className='w-full h-fit py-3 px-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-2xl border-b '>
        <h1 className='font-bold text-2xl'>Daily Planner</h1>
        <nav className='space-x-2'>
          <Button asChild>
            <Link href={'/'}>Home</Link>
          </Button>
          <Button asChild>
            <Link href={'/planner'}>Planner</Link>
          </Button>
        </nav>
        <section>
          <SignedOut>
            <div className='space-x-2'>
              <Button asChild>
                <Link href={'/sign-in'}>Login</Link>
              </Button>
              <Button variant={'outline'} asChild>
                <Link href={'/sign-up'}>Sign up</Link>
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            <Button variant={'outline'} asChild>
              <SignOutButton />
            </Button>
          </SignedIn>
        </section>
      </header>
    </>
  );
};

export default Navbar;
