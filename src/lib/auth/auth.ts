import database from '@/services/db/database';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: {
    db: database,
    type: 'postgres',
  },
  emailAndPassword: {
    enabled: true,
  },
});
