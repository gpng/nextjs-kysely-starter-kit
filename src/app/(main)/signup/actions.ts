'use server';
import { ActionError } from '@/app/(main)/models/action-models';
import { SignupActionError } from '@/app/(main)/signup/models/signup-models';
import database from '@/db/database';
import { to } from '@/lib/utils';
import bcrypt from 'bcrypt';

export const createUser = async (params: { email: string; password: string }) => {
  const { email, password } = params;

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  // check if user already exists
  const [userErr, user] = await to(
    database.selectFrom('users').where('email', '=', email).executeTakeFirst(),
  );

  if (userErr) {
    console.error(`Error checking if user exists: ${userErr}    `);
    return { error: ActionError.Unexpected };
  }

  if (user) {
    return { error: SignupActionError.InvalidEmailOrPassword };
  }

  const [err] = await to(
    database
      .insertInto('users')
      .values({
        email,
        password: hashedPassword,
      })
      .returning('id')
      .executeTakeFirstOrThrow(),
  );

  if (err) {
    console.error(`Error creating user: ${err}    `);
    return { error: ActionError.Unexpected };
  }

  return {};
};
