// app/bills/BillsDashboard.tsx
"use client";
import { useState, useCallback } from "react";
import type { Bill, BillOverride} from "@/lib/types/bills";
import { useBillsDerivedState } from "@/hooks/useBillsDerivedState";
import {dateLongToStandard} from "@/lib/dateLongToStandard";

type Props = { bills: Bill[] };

const DAYS_DELTA_TO_MILLISECONDS = 1000 * 60 *60 * 24;

export default function BillsDashboard({ bills }: Props) {
    // --- SOURCE STATE (never mutated) ---
    // bills prop is your immutable DB values

    // --- OVERRIDE STATE (what-if adjustments, client only) ---
    const [overrideAmount, setOverrideAmount] = useState<Record<string, number>>({});

    // --- FILTER STATE ---
    const [timeRange, setTimeRange] = useState<number>(14); //set to 14to simulate a common biweekly pay period
    const {
        filtered,
        totalDue,
        totalOriginal,
        whatIfDelta,
    } = useBillsDerivedState(bills, overrideAmount, timeRange);

    const handleOverride = useCallback((id: string, rawValue: number) => {
            // Remove override entirely if input is cleared — snaps back to DB value
            setOverrideAmount((prev) => {
                const next = {...prev};
                delete next[id];
                return next;
            });

    }, []);

    const resetAllOverrides = useCallback(() => setOverrideAmount({}), []);
    const hasOverrides = Object.keys(overrideAmount).length > 0;


    return (
        <div className="p-6 space-y-6 text-black w-svw">

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                    <input className={"text-black border-black placeholder:text-muted-foreground ring-1 rounded-md pl-1"} defaultValue={14} type={"number"} onChange={(e) => setTimeRange(parseFloat(e.target.value))} />
                </div>

                {hasOverrides && (
                    <button onClick={resetAllOverrides} className="text-red-500 text-sm">
                        Reset all adjustments
                    </button>
                )}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                <SummaryCard label="Total Due" value={totalDue} />
                <SummaryCard label="Original Total" value={totalOriginal} />
                <SummaryCard
                    label="Date Range"
                    value={dateLongToStandard(new Date().valueOf() + timeRange * DAYS_DELTA_TO_MILLISECONDS).toString()}
                    highlight={whatIfDelta !== 0}
                    sign
                />
            </div>

            {/* Bill List */}
            {filtered.length === 0 ? (
                <p className="text-gray-500">No bills due in this period.</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                    <tr className="text-left border-b">
                        <th>Name</th>
                        <th>Due Date</th>
                        <th>Original</th>
                        <th>Adjusted Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((bill, index) => (
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
                                    defaultValue={bill.originalAmount}
                                    onChange={(e) => handleOverride(bill.id, parseFloat(e.target.value))}
                                    className="border rounded px-2 py-1 w-28"
                                />
                                {bill.isOverridden && (
                                    <span className="ml-2 text-xs text-yellow-600">adjusted</span>
                                )}
                            </td>

                        </tr>
                    ))}
                    <tr className="text-left border-t">
                        <td>Totals</td>
                        <td></td>
                        <td>{`$${totalOriginal}`}</td>
                        <td>{`$${totalDue}`}</td>
                    </tr>
                    </tbody>
                </table>
            )}

        </div>
    );
}

// --- Sub-components ---

function SummaryCard({
                         label, value, highlight = false, sign = false,
                     }: {
    label: string;
    value: number | string;
    highlight?: boolean;
    sign?: boolean;
}) {
    return (
        <div className={`rounded-xl p-4 border ${highlight ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold ${highlight ? "text-red-600" : ""} ${highlight ? "text-green-600" : ""}`}>
                {value}
            </p>
        </div>
    );
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
