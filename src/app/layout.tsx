import Header from '@/app/components/header/header';
import Container from '@/app/components/ui/container';
import { Toaster } from '@/app/components/ui/toaster';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { FC } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface Props {
  children: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header />
        <Container variant="full" innerClassName="mt-[56px] py-8">
          {children}
        </Container>
        <Toaster />
      </body>
    </html>
  );
};

export const metadata: Metadata = {
  title: 'Next.js Kysely Starter Kit',
  description: 'Next.js Kysely Starter Kit',
};

export default MainLayout;
