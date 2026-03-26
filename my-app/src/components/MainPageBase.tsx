"use client"
import apolloClient from "@/lib/apollo/apollo-client";
import {useState, useEffect} from "react";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {ApolloProvider, useQuery} from "@apollo/client/react";
import {ReactNode} from "react";
import {AddBillModal} from "@/components/AddBillModal";
import {FiPlus} from "react-icons/fi";
import BillsDashboard from "@/components/BillsDashboard";
import gql from "graphql-tag";
import type {BillsQueryData, Bill} from "@/lib/types/bills"
import {Loading} from "@/components/Loading"
import {gqlBillToNormalized} from "@/lib/gqlBillToNormalized";
// No variables for this query
export type BillsQueryVariables = Record<string, never>;

// ---- Typed Query ----

const BILLS_QUERY: TypedDocumentNode<
    BillsQueryData,
    BillsQueryVariables
> = gql`
  query bills {
    billsCollection(first: 50) {
      edges {
        node {
          id
          name
          amount
          scheduled_on
          frequency {
            name
          }
        }
      }
    }
  }
`;


export function MainPageBase({children}: Readonly<{children: ReactNode;
}>) {
    const {loading, error, data} = useQuery(BILLS_QUERY)
    const [payItems, setPayItems] = useState<Bill[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (data && !loading && !error) {
            const changeData = () => setPayItems(gqlBillToNormalized(data))
            changeData()
        }
    }, [data, loading])

    if (loading) return <Loading/>;
    if (error) {
        console.log(error)
        return null;
    }
    if (!data) {
        console.log("no data")
        return null;
    }


    return (
        <ApolloProvider client={apolloClient}>
            <div className={"flex w-full h- flex-col bg-white"}>
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
                <BillsDashboard bills={payItems} />
                <div className={"border-t border-black"} ></div>
                {children}
            </div>
        </ApolloProvider>
    )
}