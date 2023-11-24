import database from '@/db/database';
import bcrypt from 'bcrypt';
import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession, type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Next.js Kysely Starter Kit',
      credentials: {
        id: { label: 'ID', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        try {
          const user = await database
            .selectFrom('users')
            .selectAll()
            .where('email', '=', credentials?.email)
            .executeTakeFirst();

          if (!user) return null;

          const isPasswordCorrect = bcrypt.compareSync(password, user.password);

          if (!isPasswordCorrect) return null;

          return {
            id: user.id,
          };
        } catch (error) {
          console.error('error: ', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
