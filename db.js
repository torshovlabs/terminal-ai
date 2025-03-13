import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';


// Define the path to your database file (db.json)
const file = join(import.meta.dirname, 'db.json');


// Create a JSONFile adapter for lowdb
const adapter = new JSONFile(file);
const db = new Low(adapter);


/**
 * Initialize the database with default structure if needed
 * @returns {Promise<Object>} The database data
 */
async function initDb() {
  await db.read();

  // If the file is empty or queries array doesn't exist, initialize it
  db.data = db.data || { queries: [] };
  db.data.queries = db.data.queries || [];

  await db.write();
  return db.data;
}

/**
 * Add a new query record to the database
 * @param {string} id - Simple string ID
 * @param {string} query - The query text
 * @param {string} tokens - Number of tokens used
 * @param {string} response - The response text
 * @returns {Promise<Object>} The created query record
 */
async function addQuery(id, query, tokens, response) {
  await db.read();

  // Create new query record
  const newQuery = {
    id,
    query,
    tokens,
    response,
    timestamp: new Date().toISOString()
  };

  // Add to database
  db.data.queries.push(newQuery);
  await db.write();

  return newQuery;
}


export {
  initDb,
  addQuery
};