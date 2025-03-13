import OpenAI from 'openai';
import logger from "../../../logger.js";
import { SYSTEM_PROMPTS, Language } from "./systemPrompts.js";
import { v4 as uuidv4 } from 'uuid';

export const deepseekClient = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: process.env.DEEPSEEK_API_KEY
});


class DeepSeek {
    #sessions = new Map();  // Stores conversation histories
    #MAX_HISTORY = 5;      // Keep last 5 exchanges

    #questionStyles = { /* ... existing style config ... */ };

    constructor() { /* ... existing constructor ... */ }

    // New method to start a session
    createSession() {
        const sessionId = uuidv4();
        this.#sessions.set(sessionId, {
            messages: [],
            language: Language.ENGLISH
        });
        return sessionId;
    }

    // Updated method with session support
    async askDeepSeek(question, {
        languageInput,
        styleOptionInteger,
        sessionId  // New optional parameter
    } = {}) {
        try {
            const language = this.#resolveLanguage(languageInput);
            let messages = [];

            if (sessionId) {
                // Retrieve or initialize session
                const session = this.#sessions.get(sessionId) || {
                    messages: [],
                    language
                };

                // Add previous context
                messages = [...session.messages];

                // Update session language if provided
                session.language = language || session.language;
                this.#sessions.set(sessionId, session);
            }

            // Add system message for this request
            const systemMessage = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS[this.defaultLanguage];
            messages.push(systemMessage);

            // Apply style and add user message
            const styledContent = this.#applyStyle(question, styleOptionInteger);
            messages.push({ role: 'user', content: styledContent });

            // Get response
            const response = await deepseekClient.chat.completions.create({
                model: 'deepseek-chat',
                messages
            });

            // Store conversation history
            if (sessionId) {
                const session = this.#sessions.get(sessionId);
                const newMessages = [
                    ...session.messages,
                    { role: 'user', content: styledContent },
                    { role: 'assistant', content: response.choices[0].message.content }
                ].slice(-this.#MAX_HISTORY * 2); // Keep last N exchanges

                this.#sessions.set(sessionId, {
                    ...session,
                    messages: newMessages
                });
            }

            return {
                response: JSON.parse(response.choices[0].message.content),
                sessionId: sessionId || null
            };
        } catch (error) {
            logger.error('DeepSeek API error:', error);
            return {
                error: error.message || 'Failed to get response'
            };
        }
    }
}

export default new DeepSeek();
