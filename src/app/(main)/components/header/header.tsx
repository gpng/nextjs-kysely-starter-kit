import HeaderContent from '@/app/(main)/components/header/header-content';
import { auth } from '@/auth/auth';
import { FC } from 'react';

const Header: FC = async () => {
  const session = await auth();

  return <HeaderContent isAuthenticated={!!session} />;
};

export default Header;
