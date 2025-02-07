import { mustGetSession } from '@/app/actions/auth';

const DashboardPage = async () => {
  const session = await mustGetSession();
  console.log('session: ', session);

  return <div>Should be protected. User: {session.user.email}</div>;
};

export default DashboardPage;
