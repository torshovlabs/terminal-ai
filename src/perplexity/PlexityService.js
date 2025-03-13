import { ERROR_MESSAGES } from "../../businezz/perplexity/constants.js";


class QueryProcessor {

    constructor(aiModel) {
        this.perplexityService = new PerplexityService(aiModel);
    }


    async translateWord(query) {

        try {
            const { assistantMessage, usage } = await this.perplexityService.queryPerplexity(
                query
            );

            if (usage) {
                console.log(`Usage - Total Tokens: ${usage.total_tokens}`);
            }

            if (!assistantMessage) {
                return { //TODO: call method to retry? as well as storing related data?
                    collectionId: null,
                    notesIds: null,
                    message: ERROR_MESSAGES.INTERNAL_ERROR
                };
            }

            return await this.handleQueryResponse(assistantMessage, numberToUuidMap);
        } catch (error) {            logger.error("Error processing request:", error);
            throw new Error(ERROR_MESSAGES.API_ERROR);
        }
    }

}

export default QueryProcessor;
