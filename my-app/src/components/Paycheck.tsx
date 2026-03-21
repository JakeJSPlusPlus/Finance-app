"use client"
import {useState} from "react";


type PaycheckProps = {
    name: string
    amount: number
    frequency: number
}

export default function Paycheck() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [frequency, setFrequency] = useState<number | undefined>(undefined);

    return (
    <div className="flex full h-30 items-center justify-center my-5">
        <div className="flex justify-end items-end w-30 flex-col">
            <span className={"text-black px-2 items-end my-2"}>Name</span>
            <span className={"text-black px-2 items-end my-2"}>Amount</span>
            <span className={"text-black px-2 items-end my-2"}>Days Between</span>
        </div>
        <div className="flex justify-end items-center w-50 flex-col">
            <input className={"bg-gray-200 rounded-md my-2 text-black px-1"} type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
            <input className={"bg-gray-200 rounded-md my-2 text-black px-1"} type={"text"} value={amount} onChange={(e)=> setAmount(parseInt(e.target.value))}/>
            <input className={"bg-gray-200 rounded-md my-2 text-black px-1"} type={"text"} value={frequency} onChange={(e) => setFrequency(parseInt(e.target.value))}/>
        </div>
    </div>
    )


}