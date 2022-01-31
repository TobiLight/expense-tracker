import { ActionFunction, Form, json, Link, redirect, useActionData, useCatch, useSearchParams, useTransition } from "remix";
import { ExpenseDisplay } from "~/components/Expense";
import { createExpense } from "~/db/db-operations";
import { getUser, getUserId } from "~/utils/session.server";
import { CreateExpenseActionData } from "~/utils/types";


const badRequest = (data: CreateExpenseActionData) =>
    json(data, { status: 400 });

const validateNameInput = (type: string) => {
    if (type.length < 2) {
        return 'Name is too short'
    }
}

const validateCostInput = (type: string) => {
    if (typeof type === 'string' && /\+ m/.test(type)) {
        return 'Cost cannot have invalid characters'
    }
}

const validateTypeInput = (type: string) => {
    if (type !== 'DEBIT' && type !== 'CREDIT') {
        return 'Type must be Credit or Debit'
    }
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const name = form.get("name")
    const cost = form.get("cost")
    const type = form.get("type")
    const redirectTo = form.get('redirectTo') || '/dashboard'

    if (typeof name !== 'string' || typeof cost !== 'string' || typeof type !== 'string') {
        return badRequest({ formError: 'Form not submitted correctly!' })
    }


    const fields = { name, cost, type }
    const fieldsError = {
        name: validateNameInput(name),
        cost: validateCostInput(cost),
        type: validateTypeInput(type)
    }

    if (Object.values(fieldsError).some(Boolean)) {
        return badRequest({ fieldsError, fields })
    }

    const userId = await getUserId(request)
    if (userId) {
        const data = {
            name, cost, type, userId
        }
        await createExpense({ ...data })
        return redirect(`${redirectTo}`)
    }
}

export default function AddRepenseItem() {
    const actionData = useActionData<CreateExpenseActionData>()
    const [searchParams] = useSearchParams()
    const transition = useTransition()


    if (transition.submission) {
        const name = transition.submission.formData.get('name')
        const type = transition.submission.formData.get('type')
        const cost = transition.submission.formData.get('cost')
        if (typeof name === 'string' && typeof cost === 'string' && typeof type === 'string' && !validateNameInput(name) && !validateCostInput(cost) && !validateTypeInput(type)) {
            return (
                <div className="flex flex-col mt-[20px] items-center">
                    {/* <ExpenseDisplay
                        expense={{
                            name,
                            cost: parseInt(cost),
                            type: type === 'CREDIT' ? 'CREDIT' : 'DEBIT'
                        }}
                        isOwner={true}
                        canDelete={false}
                    /> */}
                </div>
            )
        }
    }


    return (
        <div className="px-5 mt-[30px] w-11/12 mx-auto">
            <Link to="/dashboard">Go back</Link>
            <Form method="post" className="h-auto mt-[30px] shadow-md bg-white rounded px-3 py-6">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={
                        searchParams.get("redirectTo") ?? undefined
                    }
                />
                <div className="flex flex-col gap-y-6">
                    <div className="flex gap-4">
                        <label htmlFor="name" className="max-w-[42px] w-full">
                            Name
                        </label>
                        <input
                            aria-invalid={
                                Boolean(
                                    actionData?.fieldsError?.name
                                ) || undefined
                            }
                            aria-describedby={
                                actionData?.fieldsError?.name
                                    ? "name-error"
                                    : undefined
                            }
                            defaultValue={actionData?.fields?.name}
                            type="text"
                            name="name"
                            id="name"
                            minLength={3}
                            maxLength={40}
                            required
                            placeholder="Name of item"
                            className="rounded px-3 py-1 bg-gray-300" />
                    </div>
                    <div className="flex gap-4">
                        <label htmlFor="cost" className="max-w-[42px] w-full">
                            Cost
                        </label>
                        <div className="w-full">
                            <input
                                aria-invalid={
                                    Boolean(
                                        actionData?.fieldsError?.cost
                                    ) || undefined
                                }
                                aria-describedby={
                                    actionData?.fieldsError?.cost
                                        ? "cost-error"
                                        : undefined
                                }
                                defaultValue={actionData?.fields?.cost}
                                type="number"
                                name="cost"
                                id="cost"
                                placeholder="#0.00"
                                size={14}
                                min={1}
                                required
                                className="rounded px-3 py-1 bg-gray-300 max-w-[150px]" />
                            {actionData?.fieldsError?.cost ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="cost-error"
                                >
                                    {actionData?.fieldsError.cost}
                                </p>
                            ) : null}
                        </div>
                    </div>



                    <div className="flex gap-4">
                        <label htmlFor="cost">
                            Type
                        </label>
                        <div>
                            <fieldset name="type" className="flex gap-4 items-center" aria-required>
                                <label htmlFor="debit" >
                                    <input
                                        defaultChecked={true}
                                        defaultValue={"DEBIT"}
                                        type="radio"
                                        name="type"
                                    />
                                    Debit
                                </label>
                                <label htmlFor="credit">
                                    <input
                                        defaultChecked={false}
                                        defaultValue={'CREDIT'}
                                        type="radio"
                                        name="type"
                                    />
                                    Credit
                                </label>
                            </fieldset>
                            {actionData?.fieldsError?.type ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="cost-error"
                                >
                                    {actionData?.fieldsError.type}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-[12px]">
                    <button type="submit" name="_action" value="addItem" className="bg-[#325657] px-3 py-1 hover:bg-foreground-color text-white rounded">
                        {transition.state === 'submitting' ? 'Adding...' : transition.state === 'loading' ? 'Added' : 'Add'}
                    </button>
                </div>
            </Form>
            {actionData?.formError ? (
                <p
                    className="text-red-500 font-bold pt-5"
                    role="alert"
                >
                    {actionData?.formError}
                </p>
            ) : null}
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 401) {
        return (
            <div>
                <p>You're not authorized to do that</p>
            </div>
        )
    } else if (caught.status === 500) {
        return (
            <div>
                <p>Something bad happened :(</p>
            </div>
        )
    } else {
        return (
            <div className="error-container min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl">
                    {caught.status} {caught.statusText}
                </h1>
                <Link to="/">Go back</Link>
            </div>
        );
    }


}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="error-container  flex flex-col justify-center items-center min-h-screen">
            <div className="bg-red-500 p-2 w-11/12 rounded text-white">
                <h1>App Error</h1>
                <p>{error.message}</p>
            </div>
        </div>
    );
}