
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
    const signature = req.headers.get("Paddle-Signature")
    // In a real production app, verify the signature here!

    const body = await req.json()
    const eventType = body.event_type // or body.alert_name for classic
    const data = body.data

    // Admin client to bypass RLS
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    console.log(`Received event: ${eventType}`)

    try {
        let userId = data.custom_data?.user_id

        // Fallback: Try to find user by email if no user_id in custom_data
        if (!userId && data.customer?.email) {
            const { data: userData } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', data.customer.email)
                .single()
            if (userData) userId = userData.id
        }

        if (!userId) {
            console.warn("No user_id found in event data")
            return new Response("No user_id", { status: 400 })
        }

        if (eventType === "subscription.created" || eventType === "transaction.completed") {
            // Payment succeeded or new sub
            await supabase.from("profiles").update({
                plan: "pro",
                credits: 100 // Reset/Refill to 100 on payment
            }).eq("id", userId)

            // Also update subscriptions table
            await supabase.from("subscriptions").insert({
                user_id: userId,
                paddle_subscription_id: data.subscription_id || data.id,
                plan: "pro",
                status: "active",
                current_period_end: data.next_billed_at ? new Date(data.next_billed_at) : null
            })

        } else if (eventType === "subscription.canceled") {
            await supabase.from("profiles").update({
                plan: "free"
            }).eq("id", userId)

            await supabase.from("subscriptions").update({
                status: "canceled"
            }).eq("user_id", userId)
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: err.message }), { status: 400 })
    }
})
