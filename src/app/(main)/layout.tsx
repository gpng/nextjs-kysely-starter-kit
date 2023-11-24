import Header from '@/app/(main)/components/header/header';
import Container from '@/app/(main)/components/ui/container';
import { Toaster } from '@/app/(main)/components/ui/toaster';
import '@/app/(main)/globals.css';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type FC } from 'react';

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
