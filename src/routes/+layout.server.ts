import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const user: string | undefined = cookies.get('user');
    // will use event instead

    return { user }
}