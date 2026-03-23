"use client"
import {Fragment, useState} from "react";
import {AddBillModal} from "@/components/AddBillModal";
import {FiPlus} from "react-icons/fi";
import {SpreadSheetGrid} from "@/app/components/SpreadSheetGrid";
import {ApolloProvider} from "@apollo/client/react";
import apolloClient from "@/lib/apollo/apollo-client";

export default function page() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ApolloProvider client={apolloClient}>
        <div className={"flex w-full h- flex-col"}>

            <div
                className={"absolute object-center w-full h-full backdrop-blur-sm justify-center items-center bg-[#00000030]"}
                hidden={!modalVisible}>
                <div className={"relative flex justify-center items-center h-full "}>
                    <AddBillModal setVisibleAction={() => setModalVisible(false)}/>
                </div>
            </div>
            <div className={"flex w-full h-15 flex-col border-b-1 border-gray-600 items-center justify-center"}>
                <h2 className={"ml-2 flex items-center text-3xl text-black"}>{"My Finances Table View"}</h2>
            </div>
            <div className={"flex h-10 w-full border-b border-black items-center justify-start "}>
                <button onClick={() => setModalVisible(true)}
                        className={"flex w-30 h-7 bg-fuchsia-950 justify-center items-center mx-2 hover:ring-2 hover:bg-fuchsia-800 "}>
                    <FiPlus size={23}/> Add Pay
                </button>
            </div>
            <SpreadSheetGrid />
            <div className={"border-t border-black"}></div>

        </div>
        </ApolloProvider>
    )
}