/* eslint-disable no-console */

import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import database from '@/services/db/database';
import { FileMigrationProvider, Migrator } from 'kysely';

// up (default) or down
const command = process.argv[2] === 'down' ? 'down' : 'up';

const migrate = async () => {
  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(
        __dirname,
        '..',
        'services',
        'db',
        'migrations',
      ),
    }),
  });

  if (command === 'up') {
    await migrateUp(migrator);
  } else if (command === 'down') {
    await migrateDown(migrator);
  }

  await database.destroy();
};

const migrateUp = async (migrator: Migrator) => {
  const { error, results } = await migrator.migrateToLatest();

  if (!results) return;

  for (const result of results) {
    if (result.status === 'Success') {
      console.log(
        `migration "${result.migrationName}" was executed successfully`,
      );
    } else if (result.status === 'Error') {
      console.error(`failed to execute migration "${result.migrationName}"`);
    }
  }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
};

const migrateDown = async (migrator: Migrator) => {
  const { error, results } = await migrator.migrateDown();

  if (!results) return;

  // rewrite using for...of
  for (const result of results) {
    if (result.status === 'Success') {
      console.log(
        `rollback migration "${result.migrationName}" was executed successfully`,
      );
    } else if (result.status === 'Error') {
      console.error(
        `failed to execute rollback migration "${result.migrationName}"`,
      );
    }
  }

  if (error) {
    console.error('failed to rollback migrate');
    console.error(error);
    process.exit(1);
  }

  await database.destroy();
};

migrate();
