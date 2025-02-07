import HeaderContent from '@/app/components/header/header-content';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <HeaderContent isAuthenticated={!!session} />;
};

export default Header;
