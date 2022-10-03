import fs from 'fs';
import path from 'path';

import { Pool } from 'mysql2/promise';
import connection from './connection';

export function readQueries(filePath = 'createDatabase.sql') {
  const importPath = path.resolve(__dirname, filePath);
  const seedDBContent = fs.readFileSync(importPath).toString();
  const queries = seedDBContent.split(';').filter((p) => p.trim());
  return queries;
}

export async function executeQueries(
  conn: Pool,
  queries = readQueries()
) {
  try {
    for (let i = 0; i < queries.length; i += 1) {
      const query = queries[i];
      await conn.query(query);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Banco Falha em executar queries', error);
  }
}

/* c8 ignore start */
if (require.main === module) {
  executeQueries(connection)
    .then(async () => {
      // eslint-disable-next-line no-console
      console.info('Queries executadas com sucesso');
      await connection.end();
      process.exit(0);
    });
}
/* c8 ignore end */