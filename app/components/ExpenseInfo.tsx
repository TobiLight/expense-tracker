import { ExpenseInfoType } from "~/utils/types"


export const ExpenseInfo = ({ userCreditTotalExpense, userDebitTotalExpense, userTotalExpense }: ExpenseInfoType) => {
    return (
        <div>
            <div className="expense-info-wrapper">
                <div className="expense-info">
                    <h3 className="text-lg font-semibold text-[#ffff8f]">Total Debit</h3>
                    <p className="text-red-400">{`N${userDebitTotalExpense}`}</p>
                </div>

                <div className="expense-info">
                    <h3 className="text-lg font-semibold text-[#ffff8f]">Total Credit</h3>
                    <p className="text-green-400">{`N${userCreditTotalExpense}`}</p>
                </div>

                <div className="expense-info col-span-2">
                    <h3 className="text-lg font-semibold text-[#ffff8f]">Total</h3>
                    <p className="text-green-100">{`N${userTotalExpense}`}</p>
                </div>

            </div>
        </div>
    )
}