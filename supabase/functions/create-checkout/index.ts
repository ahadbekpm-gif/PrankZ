
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { priceId, successUrl } = await req.json();
        // @ts-ignore
        const polarToken = Deno.env.get('POLAR_ACCESS_TOKEN');

        if (!polarToken) {
            throw new Error('Polar Access Token not configured');
        }

        if (!priceId) {
            throw new Error('Price ID is required');
        }

        // Call Polar API to create a checkout
        // https://docs.polar.sh/api-reference/checkouts/custom
        const response = await fetch('https://api.polar.sh/v1/checkouts/custom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${polarToken}`,
            },
            body: JSON.stringify({
                product_price_id: priceId,
                success_url: successUrl || 'https://prankz.app/success', // Default or from client
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Polar API Error:', data);
            throw new Error(data.detail || 'Failed to create checkout');
        }

        return new Response(JSON.stringify({ url: data.url }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200, // Return 200 so client receives the error details
        });
    }
});
