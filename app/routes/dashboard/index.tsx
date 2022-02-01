import { Expense, ExpenseCategory } from "@prisma/client";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { ActionFunction, json, LoaderFunction, redirect, useActionData, useCatch, useLoaderData, useTransition } from "remix";
import { ExpenseDisplay } from "~/components/Expense";
import { ExpenseInfo } from "~/components/ExpenseInfo";
import { ExpenseItem } from "~/components/ExpenseItem";
import { NewExpense } from "~/components/NewExpense";
import { createExpense, deleteExpense, expenseCalculator } from "~/db/db-operations";
import { db } from "~/db/db.server";
import { getUserId } from "~/utils/session.server";
import { CreateExpenseActionData, ExpenseType } from "~/utils/types";


type LoaderDataType = {
    userId: string
    expenses: Expense[]
    userTotalExpense?: string | number
    userDebitTotalExpense?: string | number
    userCreditTotalExpense?: string | number
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (userId) {
        const expenses = await db.expense.findMany({
            where: { userId },
            orderBy: [{
                createdAt: 'desc'
            }]
        });

        if (!expenses.length) {
            const data: LoaderDataType = {
                userId, expenses, userTotalExpense: 0, userDebitTotalExpense: 0, userCreditTotalExpense: 0
            }
            return data
        }
        const userTotalExpense = expenseCalculator(expenses, 'ALL')
        const userDebitTotalExpense = expenseCalculator(expenses, 'DEBIT')
        const userCreditTotalExpense = expenseCalculator(expenses, 'CREDIT')

        const data: LoaderDataType = {
            userId, expenses, userTotalExpense, userDebitTotalExpense, userCreditTotalExpense
        }
        return data
    }
    return null
}

const badRequest = (data: CreateExpenseActionData) =>
    json(data, { status: 400 });

const validateNameInput = (type: string) => {
    if (type.length < 2) {
        return 'Name is too short'
    }
}

const validateAmountInput = (type: string) => {
    if (typeof type === 'string' && /\+ m/.test(type)) {
        return 'Anount cannot have invalid characters'
    }
}

const validateTypeInput = (type: string) => {
    if (type !== 'DEBIT' && type !== 'CREDIT') {
        return 'Type must be Credit or Debit'
    }
}

const validateCategoryInput = (category: ExpenseCategory) => {
    if (category !== 'CAKE' && category !== 'CUPCAKE' && category !== 'GROCERY' && category !== 'TITHE' && category !== 'OTHERS' && category !== 'ZOBO') {
        return 'Category type must be cake, cupcake, grocery, tithe, zobo or other! '
    }
}


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const { _action, ...values } = Object.fromEntries(form)
    let description = values.description
    let amount = values.amount
    let type = values.type
    let category = values.category as ExpenseCategory

    if (_action === 'create') {
        if (typeof description !== 'string' || typeof amount !== 'string' || typeof type !== 'string' || typeof category !== 'string') {
            return badRequest({ formError: 'Form not submitted correctly!' })
        }

        const fields = { description: description, amount: amount, type: type, category: category }
        const fieldsError = {
            description: validateNameInput(description),
            amount: validateAmountInput(amount),
            type: validateTypeInput(type),
            category: validateCategoryInput(category)
        }

        if (Object.values(fieldsError).some(Boolean)) {
            return badRequest({ fieldsError, fields })
        }

        try {
            const userId = await getUserId(request)
            if (userId) {
                const data: ExpenseType = {
                    description, amount: parseInt(amount), type, category, userId
                }
                await createExpense({ ...data });
                return redirect(`/dashboard`)
            }
        } catch (e) {
            return badRequest({ formError: 'Sorry, I could not create that for you 😔' })
        }
        return
    }

    if (_action === 'delete') {
        try {
            const userId = await getUserId(request)
            if (userId) {
                await deleteExpense({ id: values.id as string, userId: userId })
                return redirect(`/dashboard`)
            }
            throw Error('What are you trying to do, gaffer? 🙄')

        } catch (e: any) {
            return { error: e?.message, id: values.id as string }
        }
    }
    return badRequest({ formError: "Sorry, I don't understand what you're trying to do" })
}

export default function DashboardIndexRoute() {
    let { expenses, userTotalExpense, userCreditTotalExpense, userDebitTotalExpense } = useLoaderData<LoaderDataType>()
    const actionData = useActionData<CreateExpenseActionData>()
    const transition = useTransition()
    const isAdding = transition.submission && transition.submission.formData.get('_action') === 'create'
    const nameRef = useRef<HTMLInputElement>()
    const formRef = useRef<HTMLFormElement>()


    useEffect(() => {
        if (isAdding) {
            formRef.current?.reset()
            nameRef.current?.focus()
        }
    }, [isAdding])


    if (transition.submission) {
        const description = transition.submission.formData.get('description')
        const type = transition.submission.formData.get('type')
        const amount = transition.submission.formData.get('amount')
        const category = transition.submission.formData.get('category')

        if (typeof description === 'string' && typeof amount === 'string' && typeof type === 'string' && !validateNameInput(description) && !validateAmountInput(amount) && !validateTypeInput(type)) {
            return (
                <div className="w-full">
                    <div className="w-full h-full px-4 pt-[18px] flex flex-col gap-y-[80px]">
                        <NewExpense
                            formRef={formRef}
                            nameRef={nameRef}
                            actionData={{
                                fields: actionData?.fields,
                                formError: actionData?.formError,
                                fieldsError: actionData?.fieldsError
                            }}
                            isAdding={isAdding}
                        />
                        <div className="flex flex-col gap-y-4 justify-between">
                            <div>
                                <h1 className="font-bold text-xl border-b border-primary-bg pb-1">Logs</h1>
                                <div className="flex flex-col gap-y-4 mt-6 h-[350px] overflow-y-auto pb-4 expense-items items-center">
                                    <ExpenseDisplay
                                        expense={{
                                            id: '',
                                            description: description,
                                            amount: parseInt(amount),
                                            category: category === 'CAKE' ? 'CAKE' : category === 'CUPCAKE' ? 'CUPCAKE' : category === 'GROCERY' ? 'GROCERY' : category === 'TITHE' ? 'TITHE' : category === 'OTHERS' ? 'OTHERS' : 'ZOBO',
                                            type: type === 'CREDIT' ? 'CREDIT' : 'DEBIT'
                                        }}
                                        isOwner={true} />
                                    {expenses.length > 0 ? expenses.map(expense => (
                                        <ExpenseItem
                                            key={expense.id}
                                            expense={{
                                                id: expense.id,
                                                description: expense.description,
                                                category: expense.category === 'CAKE' ? 'CAKE' : expense.category === 'CUPCAKE' ? 'CUPCAKE' : expense.category === 'GROCERY' ? 'GROCERY' : expense.category === 'TITHE' ? 'TITHE' : expense.category === 'OTHERS' ? 'OTHERS' : 'ZOBO',
                                                amount: expense.amount,
                                                type: expense.type === 'CREDIT' ? 'CREDIT' : 'DEBIT',
                                                createdAt: expense.createdAt
                                            }}
                                        />
                                    )) : (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <p className="text-lg">Expenses you add appear here 👌</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h1 className="font-bold text-xl border-b border-primary-bg pb-1">Account Summary</h1>
                        <ExpenseInfo
                            userDebitTotalExpense={userDebitTotalExpense} userCreditTotalExpense={userCreditTotalExpense}
                            userTotalExpense={userTotalExpense}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="w-full">
            <div className="w-full h-full px-4 pt-[18px] flex flex-col gap-y-[80px]">
                <NewExpense
                    formRef={formRef}
                    nameRef={nameRef}
                    actionData={{
                        fields: actionData?.fields,
                        formError: actionData?.formError,
                        fieldsError: actionData?.fieldsError
                    }}
                    isAdding={isAdding}
                />
                <div className="flex flex-col gap-y-4 justify-between">
                    <div>
                        <h1 className="font-bold text-xl border-b border-primary-bg pb-1">Logs</h1>
                        <div className="flex flex-col gap-y-4 mt-6 h-[350px] overflow-y-auto pb-4 expense-items items-center">
                            {expenses.length > 0 ? expenses.map((expense: Expense) => (
                                <ExpenseItem
                                    key={expense.id}
                                    expense={{
                                        id: expense.id,
                                        description: expense.description,
                                        category: expense.category === 'CAKE' ? 'CAKE' : expense.category === 'CUPCAKE' ? 'CUPCAKE' : expense.category === 'GROCERY' ? 'GROCERY' : expense.category === 'TITHE' ? 'TITHE' : expense.category === 'OTHERS' ? 'OTHERS' : 'ZOBO',
                                        amount: expense.amount,
                                        type: expense.type === 'CREDIT' ? 'CREDIT' : 'DEBIT',
                                        createdAt: expense.createdAt
                                    }}
                                    handleDeleteExpense={() => {
                                        expenses = expenses.filter(item => item.id !== expense.id)
                                    }}
                                />
                            )) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-lg">Expenses you add appear here 👌</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <h1 className="font-bold text-xl border-b border-primary-bg pb-1">Account Summary</h1>
                <ExpenseInfo
                    userDebitTotalExpense={userDebitTotalExpense} userCreditTotalExpense={userCreditTotalExpense}
                    userTotalExpense={userTotalExpense}
                />
            </div>
        </div>
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

    // return (
    //     <p>An error has occured :(</p>
    // )

    throw new Error(
        `Unexpected caught response with status: ${caught.status}`
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="error-container">
            <p>{error ? error.stack : 'I did a whoopsies'}</p>
        </div>
    );
}