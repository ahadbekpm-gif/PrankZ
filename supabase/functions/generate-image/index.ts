
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "npm:replicate"

const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_API_TOKEN')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { image, prompt } = await req.json()

        if (!REPLICATE_API_TOKEN) {
            throw new Error('Missing REPLICATE_API_TOKEN')
        }

        if (!image) {
            throw new Error('Missing image URL')
        }

        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        console.log("Running Replicate with prompt:", prompt);

        const output = await replicate.run(
            "stability-ai/sdxl:39ed526792a6d4647d9867ce42bf7164b542e70625e18c317da23fb946c6d27",
            {
                input: {
                    prompt: `${prompt} . funny, prank, highly detailed, realistic`,
                    image: image, // URL passed from frontend
                    strength: 0.85, // Creating significant change for "prank" effect
                    num_inference_steps: 30,
                    guidance_scale: 7.5,
                    refine: "expert_ensemble_refiner"
                }
            }
        );

        console.log("Replicate Output:", output);

        // Replicate SDXL output is an array of strings (URLs)
        // [ "https://replicate.delivery/..." ]
        const resultUrl = Array.isArray(output) ? output[0] : output;

        return new Response(
            JSON.stringify({ image: resultUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        console.error("Functions Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 },
        )
    }
})
