import moment from "moment";
import { Form, Link, useFetcher } from "remix";
import { ExpenseItemType } from "~/utils/types";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import ReloadIcon from "../icons/ReloadIcon";
import TimeSharpIcon from "../icons/TimeSharpIcon";

type ExpenseItemsComponentType = {
    expense: ExpenseItemType
    handleDeleteExpense?: React.MouseEventHandler<HTMLButtonElement>
    // isDeleting: boolean
    // isDeletionFailed: string | undefined
}

export function ExpenseItem({ expense, handleDeleteExpense }: ExpenseItemsComponentType) {
    const fetcher = useFetcher()
    const isDeleting = fetcher.submission?.formData.get("id") === expense.id
    const isDeletionFailed = fetcher.data?.error
    console.log(expense.description);
    return (
        <div key={expense.id} hidden={isDeleting} className={isDeleting ? 'hidden' : "bg-primary-bg text-[#fff] rounded shadow-md px-4 py-2 flex flex-col justify-between w-11/12"}>
            <div className="flex justify-between items-start gap-4">
                <p style={{ maxWidth: 250, maxHeight: 250 }} className="text-ellipsis overflow-hidden font-semibold italic text-[#ffff8f] flex-1 max-h-[150px]">{expense.description}</p>
                <p className={expense.type === 'CREDIT' ? "text-sm font-bold text-green-100 bg-green-400 rounded p-1 flex items-center" : 'text-sm font-bold text-red-100 bg-red-400 rounded p-1 flex items-center'}>{expense.type === 'CREDIT' ? `+ N${expense.amount}` : `- N${expense.amount}` || "30,000"}</p>
            </div>
            <div className="flex flex-col pt-1">
                <div className="flex items-center">
                    <TimeSharpIcon className="w-3 h-3" />
                    <p className="max-w-[200px] max-h-[250px] text-xs text-green-100 font-semibold ">Added on {moment(expense.createdAt).format('lll')}</p>
                </div>
                <p>Category: {expense.category}</p>
            </div>

            <div className={isDeletionFailed ? 'flex justify-between items-center' : "flex justify-end"}>
                {isDeletionFailed ? (
                    <p className="text-xs text-red-500 font-semibold">Couldn't delete this item 😬</p>
                ) : null}
                <div className="flex items-center gap-2 mt-3 text-xs text-green-700">
                    {/* <button className="transform delay-75 transition-all hover:-translate-y-1" type="button" aria-label="edit">
                        <Link to={`/dashboard/edit/${expense.id}`} className="hover:text-green-700">
                            <EditIcon className="w-6 h-6 p-1 rounded bg-green-100" />
                        </Link>
                    </button> */}
                    <fetcher.Form replace method="post" className="flex items-center">
                        <input
                            type="hidden"
                            name="_action"
                            value="delete"
                        />
                        <input type="hidden" name="id" value={expense.id} />
                        <button id="deleteaction" value={expense.id} onClick={handleDeleteExpense} aria-label={isDeletionFailed ? "retry" : "delete"} type="submit" className="transform delay-75 transition-all hover:-translate-y-1">
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
    )
}