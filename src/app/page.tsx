import { currentUser } from '@clerk/nextjs/server';

const HomePage = async () => {
  const user = await currentUser();

  return <>{user?.id}</>;
};

export default HomePage;
