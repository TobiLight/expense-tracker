import { json, redirect } from "@sveltejs/kit";
import type { Actions, LayoutServerLoad } from "../$types";

export const actions = {
    logout: async (event) => {
        const logout = await event.fetch('/api/logout', { method: 'post' });
        const { success } = await logout.json();
        console.log('Logging out...');
        if (success) {
            event.cookies.delete('user')
            throw redirect(301, '/')
        }
    }
} satisfies Actions