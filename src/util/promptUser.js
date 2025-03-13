import readline from 'readline';

/**
 * Prompts the user for input on the command line
 * @param {string} question - The question or prompt to display
 * @returns {Promise<string>} The user’s response
 */
export function promptUser(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
