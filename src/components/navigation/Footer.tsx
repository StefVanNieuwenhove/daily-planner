import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-1 py-4'>
        <p className='text-sm text-base-content'>
          Built by{' '}
          <span className='text-primary-content'>
            <Link href={'https://stefvn.be'} className='font-bold'>
              Stef Van Nieuwenhove
            </Link>
          </span>
        </p>
        <p className='text-sm text-base-content text-gray-400'>
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
};

export default Footer;
