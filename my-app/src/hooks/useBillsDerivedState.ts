"use client"
import {useCallback, useMemo} from "react"
import type {Bill, BillOverride} from "@/lib/types/bills";

export type NormalizedBill = {
    id: string
    name: string
    originalAmount: number
    amount: number
    dueDate: Date;
    isOverridden: boolean
}

const DAYS_DELTA_TO_MILLISECONDS = 1000 * 60 *60 * 24;

export function useBillsDerivedState(
    bills: Bill[],
    overrideAmount: Record<string, number>,
    dateFilters: number,
) {
    const normalized = useMemo<NormalizedBill[]>(() => {
        return bills.map((b) => {
            if(b.dueDate) {
                return {
                    id: b.id,
                    name: b.name,
                    originalAmount: b.amount ?? 0,
                    dueDate: b.dueDate,
                    amount: (overrideAmount[b.id] ?? b.amount ?? 0),
                    isOverridden: overrideAmount !== null
                }
            }
            else{
            return {
                id: "-9999",
                name: "ERROR",
                originalAmount: -99999999,
                dueDate: new Date(1,1,1,1,1,1),
                amount: -1,
                isOverridden: false
                }
            }
        }) // drop malformed dates}, [bills, overrides])
    }, [bills, overrideAmount]);

    const filtered = useMemo<NormalizedBill[]>(() => {
        const now = new Date(2026, 2, 24, 0, 0, 0, 0)
        const cutOff = new Date(now.valueOf() + (dateFilters * DAYS_DELTA_TO_MILLISECONDS))

        return normalized.filter((b) => {
            return  b.dueDate >= now && b.dueDate <= cutOff;
        })
    }, [normalized, dateFilters]);

    const totalDue = useMemo(
        () => filtered.reduce((sum, b) => sum + b.amount, 0),
        [filtered, overrideAmount]);

    const totalOriginal = useMemo(
        () => filtered.reduce((sum, b) => sum + b.originalAmount, 0),
        [filtered, overrideAmount]
    )
    const sortByDate = useCallback(() => filtered.sort((a,b) => a.dueDate.valueOf() - b.dueDate.valueOf()), [filtered])
    const sortByAmount = useCallback(() => filtered.sort((a,b) => a.dueDate.valueOf() - b.dueDate.valueOf()), [filtered])

    const whatIfDelta = useMemo(
        () => totalDue - totalOriginal,
        [totalDue, totalOriginal]
    )
    return {
        normalized,       // full dataset, normalized — for "all bills" views
        filtered,         // current window + category slice
        totalDue,         // sum using effective (possibly overridden) amounts
        totalOriginal,    // sum using DB amounts only
        whatIfDelta,
        sortByDate,
        sortByAmount,
    };
}