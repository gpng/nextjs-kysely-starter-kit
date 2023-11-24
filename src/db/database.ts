import { type DB } from '@/types/kysely';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

const database = new Kysely<DB>({ dialect });

export default database;
