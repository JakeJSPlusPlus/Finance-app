"use client"

import {Fragment, useEffect, useEffectEvent, useState} from "react";
import {getSupabaseBrowserClient} from "@/lib/supabase/client";
import {getSupabaseApiClient} from "@/lib/supabase/api";

/*const PayItems = [
    {id: 1, name: "PNC", amount: 1600, frequency: 14},
    {id: 2, name: "CCF", amount: 2600, frequency: 14},
    {id: 3, name: "Case", amount: 3600, frequency: 28},
]*/



export function SpreadSheetGrid() {
    //const supabase = getSupabaseBrowserClient();
    const supabaseApiClient = getSupabaseApiClient()
    const [payItems, setPayItems] = useState<object[] | never>([]);
    /*const signIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "jkspivells42015@gmail.com",
            password: "bullet@TDF27"
        })
        if (error) {
            console.log(error)
        }
        return data
    }*/

        const setItems = useEffectEvent((
            data: object[]) => {
            setPayItems(data)
        })
        useEffect(() => {
            const getBills = async () => {
                /*const {data, error} = await supabase.from("bills").select("*")
                const
                if (error) {
                    console.log(error)
                    throw error
                }
                console.log(data)
                setItems(data)
            }*/
                if(supabaseApiClient === null){
                    throw Error("No supabaseApiClient returned");
                }
                let {data: bills, error} = await supabaseApiClient
                    .from('bills')
                    .select('*')
                if (error) {
                    console.log(error)
                    throw error
                }
                if (!bills) {
                    throw error
                }

                setItems(bills)
            }
            getBills();

        }, [])

        return (
            <div className={"grid grid-cols-4 text-black"}>
                <div className={"flex border-r align-middle justify-center"}>ID</div>
                <div className={"flex border-r align-middle justify-center"}>Name</div>
                <div className={"flex border-r align-middle justify-center"}>Amount</div>
                <div className={"flex border-r align-middle justify-center"}>Freq</div>
                {payItems.map((item: any, index: number) => (
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


