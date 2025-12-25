
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { image, prompt } = await req.json()

        if (!REPLICATE_API_TOKEN) {
            throw new Error('Missing REPLICATE_API_TOKEN')
        }

        if (!image) {
            throw new Error('Missing image data')
        }

        // Prepare inputs for stability-ai/sdxl
        // Note: Replicate expects "image" as an input, usually a URL or base64 data URI.
        // If receiving raw base64 without prefix, ensure it's formatted correctly if needed.
        // However, Replicate's API often handles data URIs best.

        // Check if image is base64 and ensure it has the prefix if missing, or use as is if it's a URL.
        // Assuming client sends a data URI (e.g. data:image/jpeg;base64,...)

        const input = {
            image: image, // Input image
            prompt: prompt || "A funny prank edit",
            mask: null, // Optional
            guidance_scale: 7.5,
            num_inference_steps: 30, // Good balance for speed/quality
            strength: 0.8, // How much to change the image (0.0 to 1.0) - higher is more chaotic
            refine: "expert_ensemble_refiner"
        }

        // We are using the "replicate" package via REST/fetch since we are in Deno
        // Calling replicate API directly

        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                Authorization: `Token ${REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // version: "stability-ai/sdxl:...", // Ideally use a specific version or the latest
                // Or simply use the model owner/name if using the deployment endpoint. 
                // For general usage, getting the latest version ID is safer or using the model endpoint.
                // Let's use the standard "create prediction" endpoint with a specific version for stability-ai/sdxl
                // Standard SDXL version hash as of typical usage (can be updated):
                // 39ed526792a6d4647d9867ce42bf7164b542e70625e18c317da23fb946c6p227
                // But better: use the model path if the API supports it, or look up version.
                // Replicate recommends using "version" in the body.
                // Using "stability-ai/sdxl" typically implies looking up the latest version.

                // Let's rely on a known good SDXL version or find a way to use the "latest".
                // Using one of the popular versions for SDXL 1.0
                version: "39ed526792a6d4647d9867ce42bf7164b542e70625e18c317da23fb946c6d27",
                input: input,
            }),
        });

        if (!response.ok) {
            const err = await response.text()
            console.error("Replicate API Error:", err)
            throw new Error(`Replicate API Error: ${response.statusText}`)
        }

        const prediction = await response.json()

        // Replicate returns a prediction object. We need to poll for the result.
        // However, Edge Functions effectively time out if we wait too long (though we have ~50s maybe?)
        // A better approach for initial version: Poll here for a bit, or return the prediction ID 
        // and have client poll.
        // For simplicity in this user's flow, we will try to poll inside the edge function 
        // since SDXL is relatively fast (seconds), usually fitting within the timeout.

        let result = prediction;
        let attempts = 0;
        while (result.status !== "succeeded" && result.status !== "failed" && result.status !== "canceled") {
            if (attempts > 30) { // Timeout protection (~30-60s)
                throw new Error("Generation timed out")
            }
            await new Promise(r => setTimeout(r, 1500)); // Wait 1.5s

            const pollResponse = await fetch(result.urls.get, {
                headers: {
                    Authorization: `Token ${REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                }
            });
            result = await pollResponse.json();
            attempts++;
        }

        if (result.status === "failed" || result.status === "canceled") {
            throw new Error(`Generation failed: ${result.error}`)
        }

        // Success! Result.output is an array of image URLs (usually 1)
        const outputUrl = result.output[0];

        return new Response(
            JSON.stringify({ image: outputUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 },
        )
    }
})
