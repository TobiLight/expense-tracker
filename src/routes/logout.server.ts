import { goto } from "$app/navigation";
import { error, fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions = {
    "logout": async (event) => {
        event.cookies.delete('user')
        // goto('/login')
        return {
            success: true,
            user: event.cookies.get('user')
        }
    }
} satisfies Actions