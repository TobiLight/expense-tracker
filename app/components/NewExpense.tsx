import { Transition } from "@remix-run/react/transition";
import { useRef, useState } from "react";
import { Form } from "remix";
import { CreateExpenseActionData } from "~/utils/types";

type NewExpenseType = {
    actionData: CreateExpenseActionData
    searchParams?: URLSearchParams
    isAdding: boolean | undefined
    nameRef: any
    formRef: any
}

export function NewExpense({ actionData, searchParams, isAdding, formRef, nameRef }: NewExpenseType) {
    return (
        <Form replace ref={formRef} action="/dashboard?index" method="post" className="h-auto bg-primary-bg text-[#ffff8f] rounded px-6 py-6">
            <input
                type="hidden"
                name="redirectTo"
                value={
                    searchParams?.get("redirectTo") ?? undefined
                }
            />
            <div className="flex flex-col gap-y-6">
                <div className="flex justify-between items-center gap-[20px]">
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-semibold max-w-[150px] w-full">
                            Description📝
                        </label>
                        <input
                            aria-invalid={
                                Boolean(
                                    actionData?.fieldsError?.description
                                ) || undefined
                            }
                            aria-describedby={
                                actionData?.fieldsError?.description
                                    ? "description-error"
                                    : undefined
                            }
                            defaultValue={actionData?.fields?.description}
                            type="text"
                            name="description"
                            id="description"
                            minLength={3}
                            maxLength={40}
                            ref={nameRef}
                            required
                            placeholder="E.g. Grocery shopping 🤑.."
                            className="rounded px-3 py-1 bg-gray-300" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="font-semibold max-w-[150px] w-full">
                            Category 💱
                        </label>
                        <select name="category" id="category" className="rounded px-3 py-1">
                            <option value="">Select Category</option>
                            <option value="CAKE">CAKE 🍰</option>
                            <option value="CUPCAKE">CUPCAKE  🧁</option>
                            <option value="GROCERY">GROCERY 🛒</option>
                            <option value="ZOBO">ZOBO 🍷</option>
                            <option value="TITHE">TITHE 💳</option>
                            <option value="OTHERS">OTHERS </option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-x-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="amount" className="font-semibold max-w-[150px] w-full">
                            Amount 💰
                        </label>
                        <div className="w-full">
                            <input
                                aria-invalid={
                                    Boolean(
                                        actionData?.fieldsError?.amount
                                    ) || undefined
                                }
                                aria-describedby={
                                    actionData?.fieldsError?.amount
                                        ? "amount-error"
                                        : undefined
                                }
                                defaultValue={actionData?.fields?.amount || ''}
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder="E.g. 5000"
                                size={14}
                                min={1}
                                required
                                className="rounded px-3 py-1 bg-gray-300 max-w-[150px] text-[#ffff8f]" />
                            {actionData?.fieldsError?.amount ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="amount-error"
                                >
                                    {actionData?.fieldsError.amount}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="cost" className="font-semibold">
                            Type ➕ ➖
                        </label>
                        <div>
                            <fieldset name="type" className="flex flex-col gap-2" aria-required>
                                <label htmlFor="type" className="text-xs flex items-center">
                                    <input
                                        disabled={isAdding}
                                        defaultChecked={true}
                                        defaultValue={"DEBIT"}
                                        type="radio"
                                        name="type"
                                        style={{ width: 30, height: 30 }}
                                    />
                                    Debit
                                </label>
                                <label htmlFor="type" className="text-xs flex items-center">
                                    <input
                                        disabled={isAdding}
                                        defaultChecked={false}
                                        defaultValue={'CREDIT'}
                                        type="radio"
                                        name="type"
                                        style={{ width: 30, height: 30 }}
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



            </div>
            <div className="button-wrapper">
                <button
                    disabled={isAdding}
                    type="submit"
                    name="_action"
                    value="create"
                    className={isAdding ? "adding" : "not-adding"}
                >
                    {isAdding ? 'Adding...' : 'Add'}
                </button>
            </div>
            {actionData.formError ? (
                <p className="text-red-500 font-semibold">{actionData.formError}</p>
            ) : null}
        </Form>
    )
}