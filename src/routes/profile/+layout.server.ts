import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad, PageServerLoad } from './$types';

export const load: LayoutServerLoad = (async ({ cookies }) => {
    const user = cookies.get('user');
    // console.log(user);
    if (!user) {
        throw redirect(301, '/login');
    }
})

