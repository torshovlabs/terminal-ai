#!/usr/bin/env node

import PerplexityService from "./src/perplexity/PerplexityService.js";
import 'dotenv/config';
import {getUserInput} from "./src/util/inputHandler.js";
import {printMessage} from "./src/util/print.js";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;


// const userInput = process.argv.slice(2).join(' ');
// console.log(`You entered: ${userInput}`);

async function main() {
    if (!PERPLEXITY_API_KEY) {
        console.log("no api key")
        //TODO: run setup process

        process.exit(1);
    }

    const userInput = await getUserInput(process.argv.slice(2));

    if (!userInput) {
        console.log("No input provided. Exiting.");
        process.exit(0);
    }


    const service = new PerplexityService;

    try {
        const { assistantMessage, usage } = await service.queryPerplexity(userInput.toString());
        printMessage(assistantMessage);
    } catch (error) {
        console.error("Error during API call:", error);
    }

}

main();