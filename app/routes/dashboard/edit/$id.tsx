import { Link, LoaderFunction, useCatch, useFetcher, useLoaderData } from "remix";
import DeleteIcon from "~/icons/DeleteIcon";
import ReloadIcon from "~/icons/ReloadIcon";
import TimeSharpIcon from "~/icons/TimeSharpIcon";
import { editExpense } from "~/db/db-operations";
import lost from "~/../public/confused.gif"
import { Expense } from "@prisma/client";
import moment from "moment";
import { ExpenseInfo } from "~/components/ExpenseInfo";

export const loader: LoaderFunction = async ({ request, params }) => {
    const expense = await editExpense({ id: params.id as string })

    if (!expense) {
        throw new Response("That doesn't exist, gaffer", { status: 404 })
    }

    return expense as Expense
}

export default function ExpenseItemDisplay() {
    const expense = useLoaderData<Expense>()
    const fetcher = useFetcher()
    const isDeleting = fetcher.submission?.formData.get("id") === expense.id
    const isDeletionFailed = fetcher.data?.error
    return (
        <div className="min-h-screen w-11/12 mx-auto">
            <div className="bg-primary-bg text-[#fff] rounded shadow-md px-4 py-2 flex flex-col justify-between w-11/12 mx-auto">
                <div className="flex justify-between items-start gap-4">
                    <p style={{ maxWidth: 250, maxHeight: 250 }} className="text-ellipsis overflow-hidden font-semibold italic text-[#ffff8f] flex-1 max-h-[150px]">{expense.description}</p>
                    <p className={expense.type === 'CREDIT' ? "text-sm font-bold text-green-100 bg-green-400 rounded p-1 flex items-center" : 'text-sm font-bold text-red-100 bg-red-400 rounded p-1 flex items-center'}>{expense.type === 'CREDIT' ? `+ N${expense.amount}` : `- N${expense.amount}` || "30,000"}</p>
                </div>
                <div className="flex gap-2 items-center pt-1">
                    <TimeSharpIcon className="w-3 h-3" />
                    {moment(expense.createdAt).format('lll') === moment(expense.updatedAt).format('lll') ?
                        (
                            <p className="max-w-[250px] max-h-[250px] text-xs text-green-100 font-semibold">
                                Created {moment(expense.createdAt).format('lll')}
                            </p>
                        )
                        :
                        (
                            <p className="max-w-[250px] max-h-[250px] text-xs text-green-100 font-semibold">Recently updated   {moment(expense.updatedAt).format('lll')}
                            </p>
                        )
                    }
                </div>



                <div className="flex justify-end">
                    <div className="flex justify-end gap-2 mt-3 text-xs text-green-700">
                        <fetcher.Form replace method="post" className="flex items-center">
                            <input
                                type="hidden"
                                name="_action"
                                value="delete"
                            />
                            <input type="hidden" name="id" value={expense.id} />
                            <button id="deleteaction" aria-label={isDeletionFailed ? "retry" : "delete"} type="submit" className="transform delay-75 transition-all hover:-translate-y-1">
                                {isDeletionFailed ? (
                                    <ReloadIcon className="w-6 h-6 rounded p-1 bg-red-500 text-green-100" />
                                ) : (
                                    <DeleteIcon className="w-6 h-6 rounded p-1 bg-green-100" />
                                )}
                            </button>
                        </fetcher.Form>
                    </div>
                </div>
            </div>
            <ExpenseInfo userDebitTotalExpense={""} userCreditTotalExpense={""} userTotalExpense={""} />
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div className="error-container pt-[40px] w-full">
                <div className="flex flex-col gap-2 items-center place-content-center">
                    <h1 className="font-bold text-xl">Page not found</h1>
                    <img src={lost} alt="404 Not found" />
                    <Link prefetch="intent" to="/dashboard">Go back</Link>
                </div>

            </div>
        );
    }

    if (caught.status === 500) {
        return (
            <p>Yikes! Server error 😬</p>
        )
    }


    throw new Error(
        `Unexpected caught response with status: ${caught.status}`
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-red-500 w-10/12 text-white flex flex-col p-3 rounded shadow">
                <p>An error has occured. Check your code</p>
                <p>Error:  {error.message}</p>
            </div>
        </div>
    )
}