"use server"
import sql from '@/app/db'

import {HTMLAttributes} from "react";

export type BillAddProps = {
    name: string
    amount: number
    frequency: number
} & HTMLAttributes<HTMLDivElement>

export async function BillAdd(name: string, amount: number, frequency: number) {
    const bill = await sql`Insert into bills (name, amount, frequency) values ("${name}, ${amount}, ${frequency}")`
    return bill.toString()
}