import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ request }) => {
    const form = await request.json();
    const { expenseAmount } = form as { expenseAmount: string };
    if (!(/^[0-9]+$/.test(expenseAmount))) {
        return json({
            message: "Amount must be numeric!",
            expenseAmount
        }, { status: 400 })
    }
    return json({ expenseAmount })
}) satisfies RequestHandler