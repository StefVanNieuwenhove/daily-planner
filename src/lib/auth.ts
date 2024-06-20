import { auth } from '@clerk/nextjs/server';

export const isLoggedIn = () => {
  const { userId } = auth();
  return !!userId;
};

export const getUser = () => {
  const { userId } = auth();
  return userId;
};
