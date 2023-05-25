
import { error, fail, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validatePassword } from '$lib/server/db';
import * as database from "$lib/server/db";

export const POST = (async ({ request }) => {
    const form = await request.json();
    const { username, password } = form as { username: string, password: string };
    // validates username and password
    if (!username || !password) {
        return json({ username, incorrect: true }, {status: 404});
    }
    // get user by username
    const user = database.getUserByUsername(username);
    if (!user) {
        return json({
            message: 'Invalid login!'
        }, { status: 400 }
        )
    }
    // validate user password
    if (!validatePassword(password, user.password)) {
        return json({
            message: 'Invalid login!'
        }, { status: 400 })
    }

    // welcome to the heavenly 😇
    return json({
        message: 'Login successful',
        user: {
            id: user.id,
            fullname: user.fullname,
            username: user.username
        }
    }, {status: 200})
}) satisfies RequestHandler;