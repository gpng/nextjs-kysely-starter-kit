/* eslint-disable no-console */

import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from 'kysely';
import * as path from 'path';
// use relative import as ts-node does not resolve aliases
import database from '../db/database';

// up (default) or down
const command = process.argv[2] === 'down' ? 'down' : 'up';

const migrate = async () => {
  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '..', 'db', 'migrations'),
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

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
};

const migrateDown = async (migrator: Migrator) => {
  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`rollback migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute rollback migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to rollback migrate');
    console.error(error);
    process.exit(1);
  }

  await database.destroy();
};

migrate();
