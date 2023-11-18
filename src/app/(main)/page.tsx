'use client';

import { buttonVariants } from '@/app/(main)/components/ui/button';
import { Typography } from '@/app/(main)/components/ui/typography';
import Link from 'next/link';
import { FC } from 'react';

const IndexPage: FC = () => {
  return (
    <div className="flex-col space-y-4">
      <Typography variant="h1">Public page</Typography>
      <Link
        className={buttonVariants({
          variant: 'link',
        })}
        href="/dashboard"
      >
        Click here to visit protected page
      </Link>
    </div>
  );
};

export default IndexPage;
