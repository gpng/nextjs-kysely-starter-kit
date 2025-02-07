/* eslint-disable no-console */

import fs from 'node:fs';
import path from 'node:path';
import { format } from 'date-fns';
import { snakeCase } from 'lodash';

const dateString = format(new Date(), 'yyyyMMddHHmmss');

const migrationName = process.argv[2];
const migrationFileName = `${dateString}-${snakeCase(migrationName)}.ts`;
const migrationPath = path.join(
  __dirname,
  '..', // src
  'services',
  'db',
  'migrations',
  migrationFileName,
);

const template = `import type { DB } from '@/services/db/types';
import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<DB>): Promise<void> {}

export async function down(db: Kysely<DB>): Promise<void> {}
`;

// create file
fs.writeFileSync(migrationPath, template);

console.log(`created migration file: ${migrationPath}`);
