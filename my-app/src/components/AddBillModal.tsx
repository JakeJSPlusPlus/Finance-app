"use client"
import {ChangeEvent, JSX, useState, useEffect} from "react";
import {FiX} from "react-icons/fi"
import {gql} from "@apollo/client"
import {useMutation, useQuery} from "@apollo/client/react";
import {dateLongToStandard} from "@/lib/dateLongToStandard";


type AddBillProps = {
    setVisibleAction: () => void;
}

const ADD_BILL = gql`
    mutation  ($name: String!, $amount: Int!, $frequency: Int!, $scheduled_on: String!){
        insertIntobillsCollection(
            objects: {  
            name: $name,
            amount: $amount,
            frequency_id: $frequency,
            scheduled_on: $scheduled_on
            }
            ){
            affectedCount
            records{
                name
                amount
                frequency{
                    name
                }
            }
        }

    }`

export function AddBillModal({setVisibleAction}: AddBillProps): JSX.Element {
    const [itemName, setItemName] = useState("");
    const [itemAmount, setItemAmount] = useState(0);
    const [itemFrequency, setItemFrequency] = useState(0);
    const [itemDueLast, setItemDueLast] = useState(new Date().toDateString());
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [insertIntobillsCollection, {loading, error, data}] = useMutation(ADD_BILL);


    useEffect(() => {

        if (error) {
            console.error(error);
        }
        if (loading) {
            console.log(itemName)

        }
        if (data) {
            setSuccess(true);
            console.log(itemName, " added successfully");
        }
    }, [data, error, loading]);

        return(
            <div
                className={"py-10 flex justify-center items-center w-full h-fit bg-white rounded-lg max-w-200 min-h-30 hover:ring-1 hover:ring-primary/10"}>
                <div className="space-y-4 " id="billContainer">
                    <div className={"flex justify-end"}>
                        <button>
                            <FiX size={25} color={"black"} onClick={setVisibleAction}/>
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        {isLoading ? "Loading..." : ""}
                        {success ? "Added" : ""}
                        <h1 className={"text-black text-3xl"}>Add Bill</h1>
                    </div>
                    {/*--Bill Row Item --*/}
                    <div
                        className="group bg-surface-container-lowest p-6 rounded-xl bill-card-shadow flex flex-col md:flex-row gap-6 items-end relative overflow-hidden transition-all ">
                        <div
                            className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-black placeholder:text-black">
                            {/*!--Field: Name --*/}
                            <div className="space-y-1">
                                <label
                                    className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline">
                                    Bill Name
                                </label>
                                <input
                                    className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                    placeholder="e.g. Mortgage" type="text" value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}/>
                            </div>
                            {/*!-- Field: Amount --*/}
                            <div className="space-y-1 ">
                                <label
                                    className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline ">
                                    Amount
                                    ($)</label>
                                <input
                                    className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all text-lg"
                                    placeholder="0.00" type="number" value={itemAmount} onChange={(e) => {
                                    setItemAmount(parseInt(e.currentTarget.value))
                                }}/>
                            </div>
                            {/*!-- Field: Frequency --*/}
                            <div className="space-y-1">
                                <label
                                    className="block font-label text-[11px] font-semibold uppercase tracking-widest text-outline">
                                    Frequency
                                </label>
                                <select
                                    className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                    value={itemFrequency}
                                    onChange={(e) => {
                                        setItemFrequency(parseInt(e.currentTarget.value))
                                    }}
                                >
                                    <option value={undefined}>Select Option</option>
                                    <option value={1}>Weekly</option>
                                    <option value={2}>Bi-weekly</option>
                                    <option value={3}>Monthly</option>
                                </select>
                            </div>
                            {/*!--Field: Due Date */}
                            <div className="space-y-1">
                                <label
                                    className={"block font-label text-[11px] font-semibold uppercase tracking-widest text-outline"}>
                                    Due Date
                                </label>
                                <input
                                    className="w-full border-b-2 border-outline-variant/20 focus:border-primary bg-transparent py-2 outline-none transition-all font-body text-lg"
                                    max="31" min="1" placeholder="1-31" type="date" value={itemDueLast}
                                    onChange={(e) => {
                                        setItemDueLast(e.currentTarget.value)
                                    }}
                                />

                            </div>
                        </div>

                    </div>
                    <div className={"flex flex-col w-full justify-end "}>
                        <div className="flex items-center  justify-end">
                            <button
                                className={"flex w-30 items-center justify-center text-white border-black bg-purple-400 rounded-xl h-10 hover:bg-purple-300 hover:ring-1 hover:ring-fuchsia-900"}
                                onClick={() => insertIntobillsCollection({variables: {name: itemName, amount: itemAmount, scheduled_on: itemDueLast, frequency: itemFrequency}})}
                            >Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
