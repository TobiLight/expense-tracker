import { ActionFunction, LoaderFunction, MetaFunction, redirect, useCatch, useTransition } from "remix"
import { Form, json, Link, useSearchParams, useActionData } from "remix";
import LogoutIcon from "~/components/Logout";
import { findUser } from "~/db/db-operations";
import { createUserSession, getUser, login, register } from "~/utils/session.server";
import { ActionData } from "~/utils/types";



export const meta: MetaFunction = () => {
    return {
        title: 'Expense Tracker | Login',
        description: 'Login to track your spendings one day at a time'
    }
}

const validateInput = (fieldName: string, prop: string) => {
    if (fieldName === 'username' && prop.length < 3) {
        return 'Username is too short :('
    }

    if (fieldName === 'password' && prop.length < 6) {
        return 'Password is too short :('
    }
}


export const loader: LoaderFunction = async ({ request }) => {
    const data = await getUser(request)
    if (data) {
        throw redirect("/dashboard")
    }
    return null
}


const badRequest = (data: ActionData) =>
    json(data, { status: 400 });


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')
    const loginType = form.get('loginType')
    const redirectTo = form.get('redirectTo') || '/dashboard'

    if (typeof username !== 'string' || typeof password !== 'string' || typeof loginType !== 'string' || typeof redirectTo !== 'string') {
        return badRequest({
            formError: 'Form not submitted correctly'
        })
    }

    const fields = { loginType, username, password }
    const fieldErrors = {
        username: validateInput('username', username),
        password: validateInput('password', password)
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors, fields })
    }

    switch (loginType) {
        case 'login': {
            const user = await login({ username: username.toLowerCase(), password })
            if (!user) {
                return badRequest({
                    fields,
                    formError: 'Incorret login, gaffer 😕'
                })
            }
            return createUserSession(user.id, redirectTo)
        }
        case 'register': {
            const existingUser = await findUser(username)
            if (existingUser) {
                return badRequest({
                    fieldErrors,
                    formError: `${username} is taken, sorry 😬`
                })
            }
            const user = await register({ username, password })
            if (!user) {
                return badRequest({
                    fields,
                    formError: 'Something went wrong 😓'
                })
            }
            return createUserSession(user.id, redirectTo)
        }
        default: {
            return badRequest({ formError: 'What are you doing, chief?' })
        }
    }
}


export default function Auth() {
    const actionData = useActionData<ActionData>()
    const { state } = useTransition()
    const [searchParams] = useSearchParams();
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center place-items-center items-center">
                <div className="w-10/12 p-3 flex flex-col place-items-center items-center rounded border border-gray-300 bg-[#283d3e] text-[#ffffc0]" data-light="">
                    <h1 className="text-4xl text-[font:var(--font-body)]">Login</h1>
                    <Form
                        method="post"
                        className="w-full p-4"
                        aria-describedby={
                            actionData?.formError
                                ? "form-error-message"
                                : undefined
                        }
                    >
                        <input
                            type="hidden"
                            name="redirectTo"
                            value={
                                searchParams.get("redirectTo") ?? undefined
                            }
                        />
                        <fieldset style={{ marginTop: 15 }}>
                            <legend className="sr-only">
                                Login or Register?
                            </legend>
                            <div className="flex gap-4 justify-center">
                                <label>
                                    <input
                                        type="radio"
                                        name="loginType"
                                        value="login"
                                        defaultChecked={
                                            !actionData?.fields?.loginType ||
                                            actionData?.fields?.loginType === "login"
                                        }
                                    />{" "}
                                    Login
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="loginType"
                                        value="register"
                                        defaultChecked={
                                            actionData?.fields?.loginType ===
                                            "register"
                                        }
                                    />{" "}
                                    Register
                                </label>
                            </div>
                        </fieldset>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="username-input">Username</label>
                            <input
                                type="text"
                                required
                                minLength={3}
                                id="username-input"
                                name="username"
                                className="rounded py-2"
                                defaultValue={actionData?.fields?.username}
                                aria-invalid={Boolean(
                                    actionData?.fieldErrors?.username
                                )}
                                aria-describedby={
                                    actionData?.fieldErrors?.username
                                        ? "username-error"
                                        : undefined
                                }
                            />
                            {actionData?.fieldErrors?.username ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="username-error"
                                >
                                    {actionData?.fieldErrors.username}
                                </p>
                            ) : null}
                        </div>
                        <div className="mt-2 flex flex-col justify-center">
                            <label htmlFor="password-input">Password</label>
                            <input
                                required
                                minLength={6}
                                id="password-input"
                                name="password"
                                className="rounded py-2"
                                defaultValue={actionData?.fields?.password}
                                type="password"
                                aria-invalid={
                                    Boolean(
                                        actionData?.fieldErrors?.password
                                    ) || undefined
                                }
                                aria-describedby={
                                    actionData?.fieldErrors?.password
                                        ? "password-error"
                                        : undefined
                                }
                            />
                            {actionData?.fieldErrors?.password ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="password-error"
                                >
                                    {actionData?.fieldErrors.password}
                                </p>
                            ) : null}
                        </div>
                        <div id="form-error-message">
                            {actionData?.formError ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                >
                                    {actionData?.formError}
                                </p>
                            ) : null}
                        </div>
                        <button type="submit" className="btn-primary w-full mt-4">
                            {state === 'submitting' ? 'Authenticating...' : 'Submit'}
                        </button>
                    </Form>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </div >
        </div >
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div className="error-container">
                Nothing to display
            </div>
        );
    }

    if (caught.status === 500) {
        return (
            <p>Yikes! The App has crashed 😬</p>
        )
    }

    return (
        <p>An error has occured :(</p>
    )

    throw new Error(
        `Unexpected caught response with status: ${caught.status}`
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-red-500 w-10/12 text-white flex flex-col place-content-center place-items-center p-3 rounded shadow">
                <h1 className="text-2xl font-bold">So sorry :(</h1>
                <p>An error has occured. Please try again later</p>
                <form action="/logout" method="post" className="flex justify-center">
                    <button type="submit" className="button">
                        <LogoutIcon className="w-8 h-8" />
                    </button>
                </form>
            </div>
        </div>
    )
}