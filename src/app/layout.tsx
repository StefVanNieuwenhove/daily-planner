import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Footer, Navbar } from '@/components';
import { Separator } from '@/components/ui/separator';
import { isLoggedIn } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/ui/custom-cursor';

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
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <Navbar isLoggedIn={true} />
            <main className=' flex gap-2 w-full h-screen px-4 py-2'>
              <CustomCursor />
              {children}
            </main>
            <Toaster />
            <Separator />
            <footer className='bottom-0 w-full flex items-center justify-center gap-4 py-4'>
              <Footer />
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
