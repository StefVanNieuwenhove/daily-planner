import { auth } from '@clerk/nextjs/server';

export const isLoggedIn = () => {
  const { userId } = auth();
  console.log('isLoggedIn', userId);
  return !!userId;
};
