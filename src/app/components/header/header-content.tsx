'use client';

import { signOut } from '@/app/actions/auth';
import { Button, buttonVariants } from '@/app/components/ui/button';
import Container from '@/app/components/ui/container';
import { DASHBOARD_ROUTE, SIGN_IN_ROUTE } from '@/app/routes';
import Link from 'next/link';

interface Props {
  isAuthenticated: boolean;
}

const HeaderContent = ({ isAuthenticated }: Props) => {
  return (
    <div className="fixed top-0 border-b w-full">
      <Container>
        <header className="flex justify-between items-center">
          <Link className={buttonVariants({ variant: 'link' })} href="/">
            Hire Teams
          </Link>
          <div className="flex items-center">
            {isAuthenticated && (
              <Link
                className={buttonVariants({ variant: 'link' })}
                href={DASHBOARD_ROUTE}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <Button size="sm" className="ml-2" onClick={signOut}>
                Logout
              </Button>
            ) : (
              <Button asChild size="sm" className="ml-2">
                <Link href={SIGN_IN_ROUTE}>Sign In</Link>
              </Button>
            )}
          </div>
        </header>
      </Container>
    </div>
  );
};

export default HeaderContent;
