import { Link, LoaderFunction, Outlet, redirect, useCatch, useLoaderData } from "remix";
import { User } from "@prisma/client"
import { getUserSession } from "~/utils/session.server";
import { findUserById } from "~/db/db-operations";
import LogoutIcon from "~/components/Logout";
import BxsHomeCircleIcon from "~/icons/HomeIcon";

type LoaderData = {
    user: Pick<User, "username" | "id"> | null,
}

export const loader: LoaderFunction = async ({ request }) => {
    // check if user is authenticated
    const redirectTo = new URL(request.url).pathname
    let session = await getUserSession(request)
    if (!session.has('userId')) {
        let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`/auth/?${searchParams}`)
    }

    const user = await findUserById(session.get('userId'))
    if (!user) {
        let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`auth/?${searchParams}`)
    }
    const data: LoaderData = {
        user: {
            id: user.id,
            username: user.username
        },
    }
    return data
}

export default function DashboardIndex() {
    const data = useLoaderData<LoaderData>()
    return (
        <div className="relative min-h-screen h-full flex flex-col gap-y-6">
            <div className="header sticky top-0 z-[1] h-[10%] flex items-end justify-between max-h-[65px] bg-primary-bg text-white w-full p-2">
                <Link prefetch="intent" to="/dashboard">
                    <BxsHomeCircleIcon className="w-8 h-8 text-green-10" />
                </Link>
                <p className="text-[14px]">Hi, {data.user?.username[0].toUpperCase()}{data.user?.username.slice(1)} 👋</p>
                <form action="/logout" method="post" className="flex justify-center">
                    <button type="submit" className="button">
                        <LogoutIcon className="w-8 h-8" />
                    </button>
                </form>
            </div>
            <main className="flex-1">
                <Outlet />
            </main>
            <div className="h-[50px] bg-primary-bg w-full text-white flex justify-center items-center">
                <footer>v0.1.0</footer>
            </div>
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div className="error-container">
                Page not found
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
                <p>Error: {error.message}</p>
                <form action="/logout" method="post" className="flex justify-center">
                    <button type="submit" className="button">
                        <LogoutIcon className="w-8 h-8" />
                    </button>
                </form>
            </div>
        </div>
    )
}