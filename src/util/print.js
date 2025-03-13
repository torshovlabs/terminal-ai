/**
 * Prints the cleaned assistant message by removing any <think> blocks
 *
 * @param {any} assistantMessage - The message received from the assistant API
 */
export function printMessage(assistantMessage) {
    if (typeof assistantMessage !== 'string') {
        console.error("Unexpected response format:", assistantMessage);
        return;
    }

    // Remove "<think>" blocks using regex
    const cleanedMessage = assistantMessage.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    console.log("\n");
    console.log(cleanedMessage);
}