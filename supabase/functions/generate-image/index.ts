
// @ts-ignore
import Replicate from "npm:replicate"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Modern Deno.serve syntax
Deno.serve(async (req) => {
    console.log(`[Function Start] Method: ${req.method}`);

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN')
        if (!REPLICATE_API_TOKEN) {
            console.error("FATAL: REPLICATE_API_TOKEN is missing");
            throw new Error('Missing Server Configuration (API Key)')
        }

        // Parse Body
        let body;
        try {
            body = await req.json();
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error("Invalid Request Body");
        }

        const { image, prompt } = body;
        console.log("Received Request:", { hasImage: !!image, promptLength: prompt?.length });

        if (!image) {
            throw new Error('Missing image URL in request')
        }

        // Initialize Replicate
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        console.log("Calling Replicate API (sdxl)...");

        const output = await replicate.run(
            "stability-ai/sdxl:39ed526792a6d4647d9867ce42bf7164b542e70625e18c317da23fb946c6d27",
            {
                input: {
                    prompt: `${prompt} . funny, prank, highly detailed, realistic`,
                    image: image,
                    strength: 0.85,
                    num_inference_steps: 30,
                    guidance_scale: 7.5,
                    refine: "expert_ensemble_refiner"
                }
            }
        );

        console.log("Replicate Success:", output);

        const resultUrl = Array.isArray(output) ? output[0] : output;

        return new Response(
            JSON.stringify({ image: resultUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        console.error("Function Error Catch:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Unknown Server Error" }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            },
        )
    }
})
