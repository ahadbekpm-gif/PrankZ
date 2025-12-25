
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN')

        // Debug Log
        console.log("[DEBUG] Request received");

        if (!REPLICATE_API_TOKEN) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing REPLICATE_API_TOKEN configuration. Please run the secrets set command.' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const { image, prompt } = await req.json()

        if (!image) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing image URL in request body' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        console.log(`[DEBUG] Prompt: ${prompt}`);

        // Call Replicate API directly using fetch
        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                version: "39ed526792a6d4647d9867ce42bf7164b542e70625e18c317da23fb946c6d27", // SDXL
                input: {
                    prompt: `${prompt} . funny, prank, highly detailed, realistic`,
                    image: image,
                    strength: 0.85,
                    num_inference_steps: 30,
                    guidance_scale: 7.5,
                    refine: "expert_ensemble_refiner"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[ERROR] Replicate API Failed: ${response.status} - ${errorText}`);
            // Return 200 with error details to show in UI
            return new Response(
                JSON.stringify({ success: false, error: `Replicate API Error: ${response.status} ${errorText}` }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const prediction = await response.json();
        console.log(`[DEBUG] Prediction created: ${prediction.id}`);

        // Poll for completion
        let result = prediction;
        let attempts = 0;

        while (result.status !== "succeeded" && result.status !== "failed" && result.status !== "canceled") {
            if (attempts > 30) { // ~30s timeout
                return new Response(
                    JSON.stringify({ success: false, error: "Generation timed out (30s limit)" }),
                    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                )
            }

            await new Promise(r => setTimeout(r, 1000));
            attempts++;

            const pollResponse = await fetch(result.urls.get, {
                headers: {
                    "Authorization": `Token ${REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                }
            });

            if (!pollResponse.ok) {
                return new Response(
                    JSON.stringify({ success: false, error: "Failed to poll prediction status" }),
                    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                )
            }

            result = await pollResponse.json();
            console.log(`[DEBUG] Poll ${attempts}: ${result.status}`);
        }

        if (result.status !== "succeeded") {
            return new Response(
                JSON.stringify({ success: false, error: `Generation failed: ${result.error || result.status}` }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
        console.log(`[SUCCESS] Output URL: ${outputUrl}`);

        return new Response(
            JSON.stringify({ success: true, image: outputUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )

    } catch (error) {
        console.error(`[FATAL] Function Error: ${error.message}`);
        // Return 200 with error details to show in UI
        return new Response(
            JSON.stringify({ success: false, error: `Internal Server Error: ${error.message}` }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            },
        )
    }
})
