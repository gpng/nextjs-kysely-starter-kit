'use client';

import { Button, buttonVariants } from '@/app/(main)/components/ui/button';
import Container from '@/app/(main)/components/ui/container';
import { DASHBOARD_ROUTE } from '@/app/(main)/routes';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  isAuthenticated: boolean;
}

const HeaderContent: FC<Props> = ({ isAuthenticated }) => {
  return (
    <div className="fixed top-0 border-b w-full">
      <Container>
        <header className="flex justify-between items-center">
          <Link className={buttonVariants({ variant: 'link' })} href="/">
            Hire Teams
          </Link>
          <div className="flex items-center">
            {isAuthenticated && (
              <>
                <Link className={buttonVariants({ variant: 'link' })} href={DASHBOARD_ROUTE}>
                  Dashboard
                </Link>
              </>
            )}
            <Button
              size="sm"
              className="ml-2"
              onClick={() => (isAuthenticated ? signOut() : signIn())}
            >
              {isAuthenticated ? 'Logout' : 'Sign In'}
            </Button>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default HeaderContent;
