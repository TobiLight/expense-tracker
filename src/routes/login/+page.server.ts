import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';
import * as database from "$lib/server/db";

export const load = (async ({ cookies }) => {
    const user = cookies.get('user');
    if (user) {
        throw redirect(301, '/profile')
    }
    return {
        message: 'Login to have access'
    };
}) satisfies PageServerLoad

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        if (!username || !password) {
            return fail(400, { username, password, failure: true });
        }
        const user = database.getUserByUsername(username);

        if (!user) {
            return fail(400, { username, password, failure: true })
        }

        if (!database.validatePassword(password, user.password)) {
            return fail(400, { username, password, failure: true })
        }

        cookies.set('user', username);
        return {
            user: {
                id: user.id, username: user.username, fullname: user.fullname
            },
            success: true
        }
    },
    logout: async ({ cookies }) => {
        cookies.delete('user');
        throw redirect(301, '/login')
    }
} satisfies Actions