import { Expense } from "@prisma/client";

export function ExpenseDisplay({ expense, canDelete, isOwner = true }: {
    expense: Pick<Expense, "id" | "description" | "amount" | "type" | "category">;
    isOwner: boolean;
    canDelete?: boolean;
}) {
    return (
        <div className="expense-display-wrapper">
            <div className="flex justify-between items-start gap-4">
                <p style={{ maxWidth: 250, maxHeight: 250 }} className="expense-display-description">{expense.description || "Random expense item"}</p>
                <p className={expense.type === 'CREDIT' ? "expense-display-type-credit" : 'expense-display-type-debit'}>{expense.type === 'CREDIT' ? `+ N${expense.amount}` : `- N${expense.amount}` || "30,000"}</p>
            </div>
            <div className="flex">
                <p className="text-xs text-green-100">Category: {expense.category === 'CAKE' ? 'CAKE' : expense.category === 'CUPCAKE' ? 'CUPCAKE' : expense.category === 'GROCERY' ? 'GROCERY' : expense.category === 'TITHE' ? 'TITHE' : expense.category === 'OTHERS' ? 'OTHERS' : 'ZOBO'}</p>
            </div>
        </div>
    )
}