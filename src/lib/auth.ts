import { useUser } from '@clerk/nextjs';

export const isLoggedIn = (): boolean => {
  const { isSignedIn } = useUser();
  return !!isSignedIn;
};
