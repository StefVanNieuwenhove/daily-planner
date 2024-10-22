import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang='en'>
      <body className={inter.className}>
        <header></header>
        <main className='container mx-auto min-h-screen h-full my-3'>
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
