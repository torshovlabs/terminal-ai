import {db} from "../src/setup/setup.js";

/**
 * Add a new query record to the database
 * @param {string} id
 * @param {string} query
 * @param {string} tokens
 * @param {string} response
 * @returns {Promise<Object>} The created query record
 */
export async function addQuery(id, query, tokens, response) {
    await db.read();

    const newQuery = {
        id,
        query,
        tokens,
        response,
        timestamp: new Date().toISOString()
    };

    db.data.queries.push(newQuery);
    await db.write();

    return newQuery;
}
