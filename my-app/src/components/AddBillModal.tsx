"use client"
import {JSX, useState} from "react";
import {FiX} from "react-icons/fi"

type AddBillProps = {
    setVisibleAction: () => void;
}

export function AddBillModal({setVisibleAction}: AddBillProps): JSX.Element {
    const [itemName, setItemName] = useState("");
    const [itemAmount, setItemAmount] = useState(0);
    const [itemFrequency, setItemFrequency] = useState(0);
    return (
    <div className={"py-10 flex justify-center items-center w-full h-fit bg-white rounded-lg max-w-200 min-h-30 hover:ring-1 hover:ring-primary/10"}>
        <div className="space-y-4 " id="billContainer">
            <div className={"flex justify-end"} >
                <button >
                    <FiX size={25} color={"black"} onClick={setVisibleAction}/>
                </button>
            </div>
                <div className="flex justify-center items-center w-full">

                    <h1 className={"text-black text-3xl"}>Add Bill</h1>
                </div>
                {/*--Bill Row Item --*/}
                <div
                    className="group bg-surface-container-lowest p-6 rounded-xl bill-card-shadow flex flex-col md:flex-row gap-6 items-end relative overflow-hidden transition-all ">
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-black placeholder:text-black">
                        {/*!--Field: Name --*/}
                        <div className="space-y-1">
                            <label
                                className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline">Bill
                                Name</label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                placeholder="e.g. Mortgage" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                        </div>
                        {/*!-- Field: Amount --*/}
                        <div className="space-y-1 ">
                            <label
                                className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline ">Amount
                                ($)</label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all text-lg"
                                placeholder="0.00" type="number" value={itemAmount} onChange={(e) => {setItemAmount(parseInt(e.currentTarget.value))}}/>
                        </div>
                        {/*!-- Field: Day --*/}
                        <div className="space-y-1">
                            <label
                                className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline">Date Due
                                </label>
                            <input
                                className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                max="31" min="1" placeholder="1-31" type="number" value={itemFrequency}
                            onChange={(e) => {setItemFrequency(parseInt(e.currentTarget.value))}}/>
                        </div>
                    </div>

                </div>
                <div className={"flex flex-col w-full justify-end "}>
                    <div className="flex items-center  justify-end">
                    <button className={"flex w-30 items-center justify-center text-white border-black bg-purple-400 rounded-xl h-10 hover:bg-purple-300 hover:ring-1 hover:ring-fuchsia-900"}>Submit</button>
                    </div>
                </div>
            </div>
    </div>
            )


            }