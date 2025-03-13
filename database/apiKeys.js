import {db} from "../db.js";

/**
 * Save or update an API key for a given domain
 * @param {string} domain
 * @param {string} apiKey
 */
export async function saveApiKey(domain, apiKey) {
    await db.read();

    // Make sure apiKeys array is initialized
    db.data.apiKeys = db.data.apiKeys || [];

    // Check if there's already an entry for this domain
    const existingEntry = db.data.apiKeys.find((entry) => entry.domain === domain);

    if (existingEntry) {
        // Update if it already exists
        existingEntry.apiKey = apiKey;
    } else {
        // Otherwise, create a new entry
        db.data.apiKeys.push({ domain, apiKey });
    }

    await db.write();
}

/**
 * Retrieve the API key for a given domain
 * @param {string} domain
 * @returns {Promise<string | undefined>}
 */
export async function getApiKey(domain) {
    await db.read();

    const entry = db.data.apiKeys.find((entry) => entry.domain === domain);
    return entry ? entry.apiKey : undefined;
}



//TODO: has to overwrite, cant be multiple with same [name/domain/id]!