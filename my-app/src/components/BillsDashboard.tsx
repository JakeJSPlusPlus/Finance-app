// app/bills/BillsDashboard.tsx
"use client";
import {useState, useMemo, useEffect} from "react";
import type {Bill, BillOverride, BillsQueryData} from "@/lib/types/bills";
import {NormalizedBill, useBillsDerivedState} from "@/hooks/useBillsDerivedState";
import {dateLongToStandard} from "@/lib/dateLongToStandard";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import {BillsQueryVariables} from "@/components/MainPageBase";
import {BILLS_QUERY} from "@/lib/graphql/queries";
import {SummaryCard} from "@/components/SummaryCard";
import {DaysFilter} from "@/components/DaysFilter";
import {formatCurrency} from "@/lib/formatCurrency";
import {BillTableBody} from "@/components/BillTableBody";
import {forEach} from "eslint-config-next";
import {FiArrowUpRight} from "react-icons/fi";


type Props = { bills: Bill[] };
type NumberRecord = Record<string, number>;
const DAYS_DELTA_TO_MILLISECONDS = 1000 * 60 *60 * 24;

export default function BillsDashboard({ bills }: Props) {
    const [timeRange, setTimeRange] = useState<number>(14); //set to 14 to simulate a common biweekly pay period
    const [overrides, setOverrides] = useState({});
    const [isSortDate, setIsSortDate] = useState<boolean>(true); //false is sorted by amount
    const {normalized, filtered, totalDue, totalOriginal, sortByAmount, sortByDate} = useBillsDerivedState(bills, overrides, timeRange)

    useEffect(() => {
        if(!isSortDate){
            sortByAmount()
        } else {
            sortByDate()
        }
    }, []);

    return (
        <div className="p-6 space-y-6 text-black w-svw">

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
                <DaysFilter onChangeAction={setTimeRange} />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                <SummaryCard label="Total Due" value={totalDue} />
                <SummaryCard label="Original Total" value={totalOriginal} />
                <SummaryCard
                    label="Date Range"
                    value={dateLongToStandard(new Date().valueOf() + timeRange * DAYS_DELTA_TO_MILLISECONDS).toString()}
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
                        <th>Due Date<FiArrowUpRight className={"hover:cursor-pointer"} size={30} onClick={() =>setIsSortDate(!isSortDate)}/></th>
                        <th>Original<FiArrowUpRight className={"hover:bg-muted"} size={30} onClick={() =>setIsSortDate(!isSortDate)}/></th>
                        <th>Adjusted Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(filtered).map((bill, index) => (
                        <BillTableBody key={index} bill={bill} handleValueChangeAction={(num) =>
                            setOverrides((prev) => ({...prev, [bill.id]:num})
                            )}
                                />
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
