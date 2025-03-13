import PerplexityService from "./perplexity/PerplexityService.js";
import {printMessage} from "./util/print.js";

/**
 * Handles broad queries when no specific command line arguments are provided
 * Uses the Perplexity API with the "do analysis" system prompt
 * @param {string} userInput - The input provided by the user in the interactive prompt
 * @returns {Promise<Object>} The Perplexity API response
 */
export async function handleBroadQuery(userInput) {
    if (!userInput || userInput.trim() === '') {
        return { assistantMessage: 'No input provided.' };
    }

    const service = new PerplexityService();

    try {
        const { assistantMessage, usage } = await service.queryPerplexity(userInput, "do analysis");
        printMessage(assistantMessage);
    } catch (error) {
        console.error("Error getting response from Perplexity:", error);
        throw error;
    }
}