import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

export const POST = (async ({ request }) => {
    const form = await request.json();
    const { buyer, type, quantity, price, paid, paymentMode } = form as { buyer: string, type: string, quantity: number, price: number, paid: boolean, paymentMode: string };

    // verify input
    if (!buyer.length) {
        return new Response(JSON.stringify({ buyer: "Buyer's name cannot be empty!" }), { status: 400 })
    }

    if (!type.length) {
        return new Response(JSON.stringify({ buyer: "Type cannot be empty!" }), { status: 400 })
    }

    if (quantity <= 0) {
        return new Response(JSON.stringify({ quantity: "Quantity must be greater than 0!" }), { status: 400 })
    }

    if (price <= 0) {
        return new Response(JSON.stringify({ price: "Price must be greater than 0!" }), { status: 400 })
    }

    if (paid === undefined) {
        return new Response(JSON.stringify({ paid: "Option cannot be empty!" }), { status: 400 })
    }

    if (!paymentMode.length) {
        return new Response(JSON.stringify({ paymentMode: "Payment must be cash or transfer!" }), { status: 400 })
    }

    // save to db here

    // get response from db here

    // return response
    return new Response(JSON.stringify({
        message: "Sale has been logged"
    }), { status: 200 })
}) satisfies RequestHandler