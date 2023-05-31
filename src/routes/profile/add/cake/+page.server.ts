import { deserialize } from "$app/forms";
import { error, fail, json } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions = {
    "log-expense": async (event) => {
        const form = await event.request.formData();
        const { expenseAmount } = Object.fromEntries(form);
        try {
            const res = await event.fetch('/api/add', {
                method: 'POST',
                body: JSON.stringify({
                    expenseAmount,

                })
            })
            if (res.status === 400) {
                throw error(400, JSON.stringify(await res.json()))
            }
            const response = await res.json().then((data: { expenseAmount: string }) => ({ ...data }));
            console.log(response);
            return { ...response }
        } catch (err: any) {
            console.log(err);
            if (err.status === 400) {
                return fail(400, JSON.parse(err.body.message))
            }
            throw error(500, "An error has occured!")
        }
    }
} satisfies Actions