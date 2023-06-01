import { deserialize } from "$app/forms";
import { error, fail, json } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions = {
    "add-cake": async (event) => {
        const form = await event.request.formData();
        const { buyer, type, price, quantity, paid, paymentMode } = Object.fromEntries(form) as {
            buyer: string
            type: string
            price: string
            quantity: string
            paid: string
            paymentMode: string
        };
        try {
            const req = await event.fetch('/api/add/cake', {
                method: "POST",
                body: JSON.stringify({
                    buyer: buyer.trim(),
                    type: type.trim(),
                    price: parseInt(price),
                    quantity: parseInt(quantity),
                    paid: paid === 'yes' ? true : false,
                    paymentMode
                })
            })

            if (!req.ok)
                throw error(req.status, await req.json())

            const resp = await req.json().then(data => data as { message: string })
            return {
                ...resp
            }
        } catch (err: any) {
            console.log(err)
            return fail(err.status as number, err.body)
            // throw error(err.status as number, err.body as App.Error)
        }
    }
} satisfies Actions