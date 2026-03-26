"use client"

import {Fragment, useEffect, useEffectEvent, useReducer, useState} from "react";
import {getSupabaseBrowserClient} from "@/lib/supabase/client";
import {getSupabaseApiClient} from "@/lib/supabase/api";
import gql from "graphql-tag";
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {useQuery} from "@apollo/client/react";
import {Loading} from "@/components/Loading"

export interface BillsQueryData {
    billsCollection: {
        edges: {
            node: {
                id: string;
                name: string;
                amount: string;
                frequency: {
                    name: string;
                };
            };
        }[];
    };
}

// No variables for this query
export type BillsQueryVariables = Record<string, never>;

// ---- Typed Query ----

export const BILLS_QUERY: TypedDocumentNode<
    BillsQueryData,
    BillsQueryVariables
> = gql`
  query bills {
    billsCollection(first: 32) {
      edges {
        node {
          id
          name
          amount
          frequency {
            name
          }
        }
      }
    }
  }
`;

export function SpreadSheetGrid() {
    const {loading, error, data} = useQuery(BILLS_QUERY);
    const [payItems, setPayItems] = useState<BillsQueryData| undefined>();

    if (loading) return <Loading />;
    if (error){
        console.log(error)
        return null;}
    if (!data){
        console.log("no data")
        return null;
    }


    return (
        <div className={"grid grid-cols-4 text-black"}>
            <div className={"flex border-r align-middle justify-center"}>ID</div>
            <div className={"flex border-r align-middle justify-center"}>Name</div>
            <div className={"flex border-r align-middle justify-center"}>Amount</div>
            <div className={"flex border-r align-middle justify-center"}>Freq</div>
            {payItems?.billsCollection.edges.map(({node}, index) => (
                <Fragment key={index}>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{node.id}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{node.name}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{node.amount}</div>
                    <div className={"flex border-r align-middle justify-center border-t p-1"}>{node.frequency.name}</div>
                </Fragment>
            ))}
        </div>
    )
}


