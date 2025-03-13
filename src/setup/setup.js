#!/usr/bin/env node

import { printMessage } from "../util/print.js";
import { promptUser } from "../util/promptUser.js";
import { saveApiKey, getApiKey } from "../../database/apiKeys.js";
import { initDb } from "../../db.js";

const domains = [
    'Perplexity',
    'openAi',
];

/**
 * Runs the interactive setup process:
 * - Presents a list of domains.
 * - Prompts the user to pick a domain.
 * - Prompts for an API key.
 * - Saves that domain/key pair into the database.
 * This version calls process.exit() when finished.
 */
export async function runSetup() {
    try {
        // Ensure our DB file is initialized
        await initDb();

        // 1) Present a domain list as a single question:
        let message = "Please select a domain to set up an API key for:\n";
        domains.forEach((domain, idx) => {
            message += `${idx + 1}. ${domain}\n`;
        });
        message += "Enter the number of the domain: ";

        const domainChoice = await promptUser(message);
        const index = parseInt(domainChoice.trim(), 10) - 1;

        // Basic safety check for valid selection
        if (index < 0 || index >= domains.length) {
            console.log("Invalid domain choice. Exiting setup.");
            process.exit(0);
        }

        const chosenDomain = domains[index];
        printMessage(`You chose: ${chosenDomain}`);

        // 2) Prompt user for API key
        const keyInput = await promptUser("Enter your API key: ");
        const apiKey = keyInput.toString().trim();

        // 3) Save the domain/key pair in the database
        await saveApiKey(chosenDomain, apiKey);

        printMessage(`\nSuccess! Your API key for ${chosenDomain} has been saved.`);
        process.exit(0);

    } catch (error) {
        console.error("Error during setup:", error);
        process.exit(1);
    }
}

/**
 * Checks if an API key is present in the database for 'Perplexity'.
 * If not, it calls runSetup to prompt the user.
 */
export async function checkApiKey() {
    await initDb();
    const key = await getApiKey('Perplexity');
    if (!key) {
        console.log("No API key found in database. Starting setup...");
        await runSetup();
        // runSetup calls process.exit() on success/failure so code below will likely not run.
    }
}

// If this file is run directly from the command line...
if (import.meta.url === `file://${process.argv[1]}`) {
    checkApiKey();
}
