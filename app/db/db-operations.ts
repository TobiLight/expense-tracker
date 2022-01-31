import { Expense } from "@prisma/client"
import { CreateUser, DeleteExpenseType, ExpenseType } from "~/utils/types"
import { db } from "./db.server"

export const findUser = async (username: string) => {
    const foundUser = await db.user.findFirst({
        where: { username }
    })
    return foundUser
}

export const findUserById = async (id: string) => {
    const foundUser = await db.user.findFirst({
        where: { id }
    })
    return foundUser
}

export const createUser = async ({ username, password }: CreateUser) => {
    const user = await db.user.create({
        data: {
            username,
            passwordHash: password
        }
    })
    return user
}

// EXPENSE DB OPERATIONS

export const createExpense = async (data: ExpenseType) => {
    const expense = await db.expense.create({
        data: {
            description: data.description,
            amount: data.amount,
            type: data.type === 'CREDIT' ? 'CREDIT' : 'DEBIT',
            category: data.category === 'CAKE' ? 'CAKE' : data.category === 'CUPCAKE' ? 'CUPCAKE' : data.category === 'GROCERY' ? 'GROCERY' : data.category === 'TITHE' ? 'TITHE' : data.category === 'OTHERS' ? 'OTHERS' : 'ZOBO',
            user: {
                connect: { id: data.userId }
            }
        },
        include: {
            user: true
        }
    })
    return expense
}

export const editExpense = async ({ id }: Pick<Expense, "id">) => {
    const expense = await db.expense.findUnique({
        where: { id }
    })
    return expense
}



export const deleteExpense = async ({ id, userId }: DeleteExpenseType) => {
    const user = await findUserById(userId)
    if (!user) {
        throw new Response("You can't do that, gaffer 🙄",
            {
                status: 403
            })
    }

    return await db.expense.delete({
        where: { id }

    })
}

export const totalExpense = (expenses: Expense[]) => {
    const allExpenses = expenses.filter(item => item.type)
    const total = Object.values(allExpenses).reduce((previous, { amount }) => previous + amount, 0)
    return total.toLocaleString('en-US')
}

export const totalCreditExpense = (expenses: Expense[]) => {
    const creditExpenses = expenses.filter(item => item.type === 'CREDIT')
    const total = Object.values(creditExpenses).reduce((previous, { amount }) => previous + amount, 0)
    return total.toLocaleString('en-US')
}

export const totalDebitExpense = (expenses: Expense[]) => {
    const debitExpenses = expenses.filter(item => item.type === 'DEBIT')
    const total = Object.values(debitExpenses).reduce((previous, { amount }) => previous + amount, 0)
    return total.toLocaleString('en-US')
}

export const expenseCalculator = (expenses: Expense[], type: 'ALL' | 'CREDIT' | 'DEBIT') => {
    if (type === 'ALL') {
        return totalExpense(expenses)
    }

    if (type === 'CREDIT') {
        return totalCreditExpense(expenses)
    }

    if (type === 'DEBIT') {
        return totalDebitExpense(expenses)
    }

    return 'I dont understand that, gaffer 😕'
}