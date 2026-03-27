import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import type {BillsQueryData} from "@/lib/types/bills";
import gql from "graphql-tag";
import {BillsQueryVariables} from "@/components/MainPageBase";

export const BILLS_QUERY: TypedDocumentNode<
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
