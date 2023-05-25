import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const user: string | undefined = cookies.get('user');
    if (user) {
        throw redirect(301, '/profile');
    }
}

