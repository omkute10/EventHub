import { pool } from './db';
import fs from 'fs';
import path from 'path';

async function initDb() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Read and execute schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schema);

    await client.query('COMMIT');
    console.log('Database initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initDb()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default initDb; 