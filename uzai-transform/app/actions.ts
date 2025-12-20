'use server';

import Replicate from "replicate";
import fs from 'fs';

export async function transformImageAction(base64Image: string, prompt: string): Promise<string> {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN || ""
    });

    let fullPrompt = "";
    try {
        fullPrompt = `Task: Professional AI Photo Prank.
Instruction: "${prompt}".
Constraint: You MUST modify the input image. Output ONLY the modified image.`;

        console.log("Server Action: Starting Replicate generation with model: google/nano-banana-pro");

        // Strip base64 prefix if present
        const cleanBase64 = base64Image.includes('base64,')
            ? base64Image.split('base64,')[1]
            : base64Image;

        const input = {
            image_input: [cleanBase64],
            prompt: fullPrompt,
        };

        console.log("Server Action: Starting Replicate run...");

        const output: any = await replicate.run(
            "google/nano-banana-pro",
            { input }
        );

        console.log("Replicate Output Successful");

        if (Array.isArray(output) && output.length > 0) {
            return output[0];
        } else if (typeof output === 'string') {
            return output;
        }

        throw new Error(`Replicate returned unexpected output format: ${JSON.stringify(output)}`);
    } catch (error: any) {
        const errorLog = `
--- ${new Date().toISOString()} ---
Error Message: ${error.message}
Error Stack: ${error.stack}
Error Name: ${error.name}
Full Error: ${JSON.stringify(error)}
---------------------------------
`;
        try {
            fs.appendFileSync('replicate_error.log', errorLog);
        } catch (e) {
            console.error("Failed to write to log file", e);
        }

        console.error("Server Action Replicate Error:", error.message);

        if (error.message?.includes("NS_ERROR_NOT_AVAILABLE") || error.message?.includes("401")) {
            throw new Error("Replicate authentication failed or service unavailable. Please check your API token.");
        }
        throw new Error(`Replicate Error: ${error.message || "Unknown error during transformation"}`);
    }
}
