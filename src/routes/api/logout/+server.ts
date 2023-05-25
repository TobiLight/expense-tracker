import { validatePassword } from "$lib/server/db";
import { json, redirect, type RequestHandler } from "@sveltejs/kit";

// export const GET = (async ({ cookies }) => {
//     console.log(cookies.get('user'));
//     cookies.delete('user')
//     throw redirect(301, '/')
// }) satisfies RequestHandler

export const POST = (async ({ cookies }) => {
    cookies.delete('user');
    return json({
        message: 'You have successfully logged out!',
        success: true
    })
}) satisfies RequestHandler;