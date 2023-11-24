/* eslint-disable no-console */

import { format } from 'date-fns';
import fs from 'fs';
import { snakeCase } from 'lodash';
import path from 'path';

const dateString = format(new Date(), 'yyyyMMddHHmmss');

const migrationName = process.argv[2];
const migrationFileName = `${dateString}-${snakeCase(migrationName)}.ts`;
const migrationPath = path.join(__dirname, '..', 'db', 'migrations', migrationFileName);

const template = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

}

export async function down(db: Kysely<any>): Promise<void> {

}
`;

// create file
fs.writeFileSync(migrationPath, template);

console.log(`created migration file: ${migrationPath}`);
