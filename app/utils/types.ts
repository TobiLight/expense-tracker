import { User } from "@prisma/client";

export type CreateUser = {
    username: string
    password: string
}

export type ActionData = {
    formError?: string;
    fieldErrors?: {
        username: string | undefined;
        password: string | undefined;
    };
    fields?: {
        loginType: string;
        username: string;
        password: string;
    };
};

export type DeleteActionData = {
    error?: string
}

export type CreateExpenseActionData = {
    fields?: {
        description: string
        type: string
        amount: string | number
        category: string
    }
    formError?: string
    fieldsError?: {
        description: string | undefined
        type: string | undefined
        amount: string | number | undefined
        category: string | undefined
    }
}

export type ExpenseType = {
    id?: string
    description: string
    type: string
    amount: number
    category: string
    userId: string
    user?: User
}

export enum ExpenseCategory {
    'CAKE',
    'CUPCAKE',
    'TITHE',
    'ZOBO',
    'GROCERY',
    'OTHERS'
}

export type ExpenseItemType = {
    id: string
    description: string
    amount: number
    category: string
    type: 'DEBIT' | 'CREDIT'
    createdAt: Date
    updatedAt?: Date
}


export type DeleteExpenseType = {
    id: string
    userId: string
}

export type ExpenseInfoType = {
    income?: string | number
    savings: string | number
    userDebitTotalExpense?: string | number
    userCreditTotalExpense?: string | number
    userTotalExpense?: string | number
}