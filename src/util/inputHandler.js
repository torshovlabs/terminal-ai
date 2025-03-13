import readline from 'readline';
import {handleBroadQuery} from "../BroadQueryService.js";


/**
 * Gets user input either from command line arguments or interactive prompt
 * If interactive prompt is used, calls handleBroadQuery for Perplexity service
 * @param {string[]} args - Command line arguments
 * @returns {Promise<string|Object>} The user input or Perplexity response
 */
export async function getUserInput(args) {
    let userInput = args.join(' ');

    // If no input was provided via command line arguments
    if (!userInput || userInput.trim() === '') {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        try {
            userInput = await new Promise((resolve) => { // Prompt user for input
                rl.question('Something more than a Terminal commando?  ⇶  \n', (answer) => {
                    resolve(answer);
                });
            });
        } finally {
            rl.close();
        }

        if (!userInput || userInput.trim() === '') {
            return '';
        }

        // Call the broadQueryService with the interactive input
        return await handleBroadQuery(userInput);
    }

    // Regular command-line case - just return the input
    return userInput.toString();
}