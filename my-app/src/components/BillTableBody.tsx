"use client"

import {dateLongToStandard} from "@/lib/dateLongToStandard";
import {NormalizedBill} from "@/hooks/useBillsDerivedState";
import {formatCurrency} from "@/lib/formatCurrency";
import {useCallback, useState} from "react";

type BillTableBodyProps = {
    bill: NormalizedBill,
    handleValueChangeAction : (value:number) => void,


}


export function BillTableBody({bill, handleValueChangeAction} :BillTableBodyProps) {
    const [overrideAmount, setOverrideAmount] = useState<number>(bill.originalAmount)

    return (
        <>
            <tr key={bill.id} className={bill.isOverridden ? "bg-yellow-50" : ""}>
                <td>{bill.name}</td>
                <td>{dateLongToStandard(bill.dueDate.valueOf()).toString()}
                </td>
                <td className="text-gray-400">{formatCurrency(bill.originalAmount)}</td>
                <td>
                    <input
                        type="number"
                        min={0}
                        step={1}
                        value={overrideAmount ?? bill.originalAmount}
                        onChange={(e) => {
                            handleValueChangeAction(e.currentTarget.valueAsNumber)
                            setOverrideAmount(e.currentTarget.valueAsNumber)
                        }}
                        className="border rounded px-2 py-1 w-28"
                    />
                    {bill.isOverridden && (
                        <span className="ml-2 text-xs text-yellow-600">adjusted</span>
                    )}
                </td>

            </tr>
        </>
    );
}