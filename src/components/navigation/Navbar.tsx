'use client';

import { UserButton, useSession } from '@clerk/nextjs';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';
import { Separator } from '../ui/separator';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

type NavbarProps = {
  isLoggedIn: boolean;
};

const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  return (
    <>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-base-100 px-4 py-2 backdrop-saturate-180 backdrop-blur-xl'>
        <span className='flex md:hidden'>
          <Sheet open={open} onOpenChange={() => setOpen(!open)}>
            <SheetTrigger asChild>
              <Button variant={'ghost'}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetHeader>
                <SheetTitle>
                  Welcome to Daily Planner{' '}
                  <Link
                    href={'/user-profile'}
                    className='text-base-content underline '>
                    {session?.publicUserData.firstName}
                  </Link>
                  !
                </SheetTitle>
                <Separator />
                <SheetDescription className='flex flex-col gap-2'>
                  <Link href={'/'}>
                    <Button variant={'link'} onClick={() => setOpen(false)}>
                      Home
                    </Button>
                  </Link>
                  {isLoggedIn && (
                    <Link href={'/planner'}>
                      <Button variant={'link'} onClick={() => setOpen(false)}>
                        My Planner
                      </Button>
                    </Link>
                  )}
                  <Link href={'/pricing'}>
                    <Button variant={'link'} onClick={() => setOpen(false)}>
                      Pricing
                    </Button>
                  </Link>
                  <Link href={'/contact'}>
                    <Button variant={'link'} onClick={() => setOpen(false)}>
                      Contact
                    </Button>
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </span>
        <h1 className='text-xl font-bold text-base-content text-center uppercase'>
          Daily Planner
        </h1>
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList className='w-full flex md:gap-10 sm:gap-4 '>
            <NavigationMenuItem>
              <NavigationMenuLink href='/'>
                <Button variant={'link'} className='text-md text-base-content'>
                  Home
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {isLoggedIn && (
              <NavigationMenuItem>
                <NavigationMenuLink href='/planner'>
                  <Button
                    variant={'link'}
                    className='text-md text-base-content'>
                    My Planner
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <NavigationMenuLink href='/pricing'>
                <Button variant={'link'} className='text-md text-base-content'>
                  Pricing
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href='/contact'>
                <Button variant={'link'} className='text-md text-base-content'>
                  Contact
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex items-center gap-4'>
          {isLoggedIn ? (
            <UserButton />
          ) : (
            <Button
              variant='outline'
              className='text-base-content bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-200'>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </header>
      <Separator />
    </>
  );
};

export default Navbar;
