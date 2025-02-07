'use server';

import { SIGN_IN_ROUTE } from '@/app/routes';
import { auth } from '@/lib/auth/auth';
import { to } from '@/lib/utils';
import { APIError } from 'better-auth/api';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signIn = async (
  email: string,
  password: string,
): Promise<string | undefined> => {
  const [err] = await to(
    auth.api.signInEmail({
      body: {
        email,
        password,
      },
    }),
  );

  if (err) {
    if (err instanceof APIError) {
      const splitMessage = err.message.split(err.status);
      return splitMessage[1]?.trim() || err.message;
    }

    return 'An error occurred';
  }
};

export const signUp = async (
  email: string,
  password: string,
): Promise<string | undefined> => {
  const [err] = await to(
    auth.api.signUpEmail({
      body: {
        name: 'Default',
        email,
        password,
      },
    }),
  );

  if (err) {
    if (err instanceof APIError) {
      const splitMessage = err.message.split(err.status);
      return splitMessage[1]?.trim() || err.message;
    }

    return 'An error occurred';
  }
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};

export const mustGetSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(SIGN_IN_ROUTE);
  }

  return session;
};
