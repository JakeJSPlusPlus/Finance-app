'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import {FiMinus, FiPlus} from "react-icons/fi";
import React from "react";

type Bill = {
    name: string
    amount: number
    frequency: 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'annually'
}

type BillsFormValues = {
    bills: Bill[]
}

const FREQUENCIES = [
    { value: 'weekly',      label: 'Weekly',       multiplier: 4.33  },
    { value: 'bi-weekly', label: 'Bi-Weekly',  multiplier: 2.17  },
    { value: 'monthly',     label: 'Monthly',      multiplier: 1     },
    { value: 'quarterly',   label: 'Quarterly',    multiplier: 1/3   },
    { value: 'annually',    label: 'Annually',     multiplier: 1/12  },
] as const

export default function BillsForm() {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<BillsFormValues>({ defaultValues: { bills: [] } })

    const { fields, append, remove } = useFieldArray({ control, name: 'bills' })

    const watchedBills = watch('bills')

    const monthlyTotal = watchedBills.reduce((sum, bill) => {
        const freq = FREQUENCIES.find(f => f.value === bill.frequency)
        return sum + (Number(bill.amount) || 0) * (freq?.multiplier ?? 1)
    }, 0)

    const onSubmit: SubmitHandler<BillsFormValues> = (data) => {
        console.log(data)
        // send to your API here
    }

    return(
        <div className={"flex justify-center flex-col items-center w-full h-fit bg-white rounded-lg max-w-200 min-h-30 hover:ring-1 hover:ring-primary/10"}>
            <button
                className={"items-start justify-center text-black flex rounded-xl bg-gray-400 p-1 px-3 border hover:ring-1 flex-row "}
                type="button"
                onClick={() => append({name: '', amount: 0, frequency: 'monthly'})}
            >

                Add bill
            </button>
            <div className={"space-y-4 "}>
            <div className={"group bg-surface-container-lowest p-6 rounded-xl bill-card-shadow flex flex-col md:flex-row gap-6 items-end relative overflow-hidden transition-all"}>
                <div className="group bg-surface-container-lowest p-6 rounded-xl bill-card-shadow flex flex-col md:flex-row gap-6 items-end relative overflow-hidden transition-all ">
                    <div className={"flex-grow  w-full text-black placeholder:text-black"} >
                <form onSubmit={handleSubmit(onSubmit)} className={"text-black space-y-4"}>

                    {fields.map((field, index) => (
                        <div key={field.id}
                             className={"flex w-full justify-center flex-col group bg-surface-container-lowest rounded-xl bill-card-shadow :flex-row gap-6 items-end relative overflow-hidden transition-all"}>
                            {/* Name */}
                            <div className="space-y-1">
                            <label
                                className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline">Bill
                                Name</label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                {...register(`bills.${index}.name`, {required: 'Name is required'})}
                                placeholder="e.g. Mortgage"
                            />
                            </div>
                            {errors.bills?.[index]?.name && (
                                <span>{errors.bills[index].name.message}</span>
                            )}

                            {/* Amount */}
                            <div className="space-y-1 ">
                                <label className={"block font-label text-[11px] font-semibold uppercase tracking-widest text-outline"}>
                                    Amount ($)
                                </label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all text-lg"
                                type="number"
                                step="0.01"
                                {...register(`bills.${index}.amount`, {
                                    required: 'Amount is required',
                                    min: {value: 0.01, message: 'Must be greater than 0'},
                                    valueAsNumber: true,
                                })}
                                placeholder="0.00"
                            />
                            {errors.bills?.[index]?.amount && (
                                <span>{errors.bills[index].amount.message}</span>
                            )}
                            </div>

                            {/* Frequency */}
                            <div className="space-y-1 ">
                                <label className={"block font-label text-[11px] font-semibold uppercase tracking-widest text-outline"}>
                                    Due Date
                                </label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all text-lg"
                                type="number"
                                step="0.01"
                                {...register(`bills.${index}.amount`, {
                                    required: 'Amount is required',
                                    min: {value: 0.01, message: 'Must be greater than 0'},
                                    valueAsNumber: true,
                                })}
                                placeholder="0.00"
                            />
                            {errors.bills?.[index]?.amount && (
                                <span>{errors.bills[index].amount.message}</span>
                            )}
                            </div>


                            <button
                                className={"text-black bg-red-600 flex rounded-lg p-1 border hover:ring-1 items-center justify-center"}
                                type="button" onClick={() => remove(index)}><FiMinus size={25}/></button>
                        </div>
                    ))}


                    <button type="submit">Save bills</button>
                </form>
            </div>
        </div>
        </div>
            </div>
        </div>
    )
}