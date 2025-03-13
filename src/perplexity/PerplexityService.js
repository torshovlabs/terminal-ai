import 'dotenv/config';
import {SYS_C37} from "../util/constants.js";
import {getApiKey} from "../../database/apiKeys.js";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export default class PerplexityService {


    async queryPerplexity(userInput, sys) {
        const apiKey = await getApiKey('Perplexity');
        if (!apiKey) {
            throw new Error("API key is missing from the database"); //TODO: run setup or a util file to debug or command
        }

        const systemContent = sys || SYS_C37;

        try {
            const options = {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'r1-1776',
                    messages: [
                        {
                            role: "system",
                            content: systemContent
                        },
                        {
                            role: "user",
                            content: `${userInput}`
                        }
                    ],
                    temperature: 0.2,
                    top_p: 0.1,
                    return_citations: false,
                    return_images: false,
                    return_related_questions: false,
                    frequency_penalty: 1,
                    stream: false
                })
            };

            const response = await fetch('https://api.perplexity.ai/chat/completions', options);
            // console.log("HTTP status:", response.status);


            const data = await response.json();


            return {
                assistantMessage: data.choices[0]?.message?.content,
                // assistantMessage: data,
                usage: data.usage
            };
        } catch (error) {
            console.error("Error querying Perplexity API:", error);
            throw new Error('Failed to query Perplexity API');
        }
    }
}
