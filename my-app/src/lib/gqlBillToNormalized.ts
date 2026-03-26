"use client"
import type {BillsQueryData, Bill} from "@/lib/types/bills"


export function gqlBillToNormalized(data: BillsQueryData): Bill[] {
    return data.billsCollection.edges.map(({node} )=> {
        return {
            id: node.id,
            name: node.name,
            amount: parseFloat(node.amount),
            dueDate: new Date(node.scheduled_on),
            frequency:node.frequency.name
        }


    })
}
