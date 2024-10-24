import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daily Planner',
  description: 'A simple planner for your daily tasks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Navbar />
          <main className='container mx-auto min-h-screen h-full my-3'>
            {children}
          </main>
          <Toaster richColors duration={5000} theme='light' />
          <footer></footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
