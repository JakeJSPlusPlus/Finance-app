"use client"

import {Fragment, useEffect, useEffectEvent, useState} from "react";
import {getSupabaseBrowserClient} from "@/lib/supabase/client";

const PayItems = [
    {id: 1, name: "PNC", amount: 1600, frequency: 14},
    {id: 2, name: "CCF", amount: 2600, frequency: 14},
    {id: 3, name: "Case", amount: 3600, frequency: 28},
]

type billItems = {
    id: number
    name: string
    amount: number
    frequency: number
}

export function SpreadSheetGrid(){
    const supabase = getSupabaseBrowserClient();
    const [payItems, setPayItems] = useState<billItems[] | never>([]);
    const signIn = async  () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "jkspivells42015@gmail.com",
            password: "bullet@TDF27"
        })
        if (error) {
            console.log(error)
        }
        return data
    }

    const setItems = useEffectEvent((
        data:billItems[]) => {
        setPayItems(data)
    })
    useEffect(() => {
        const getBills = async ()=> {
            const {data, error} = await supabase.from("bills").select("*")
            if (error) {
                console.log(error)
            }
            console.log(data)
            setItems(data)
        }
        getBills();
    }, [])

    return (
        <div className={"grid grid-cols-4 text-black"}>
            <div className={"flex border-r align-middle justify-center"}>ID</div>
            <div className={"flex border-r align-middle justify-center"}>Name</div>
            <div className={"flex border-r align-middle justify-center"}>Amount</div>
            <div className={"flex border-r align-middle justify-center"}>Freq</div>
            {PayItems.map((item: any, index: number) => (
                <Fragment key={index}>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{item.id}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{item.name}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{item.amount}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{item.frequency}</div>
                </Fragment>
            ))}
        </div>
    )
}

