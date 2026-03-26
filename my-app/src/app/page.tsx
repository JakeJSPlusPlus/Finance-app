"use client"
import {ApolloProvider} from "@apollo/client/react";
import apolloClient from "@/lib/apollo/apollo-client";
import {MainPageBase} from "@/components/MainPageBase";






export default function page() {

    return (
        <ApolloProvider client={apolloClient}>
            <div className="h-lvh bg-white">
                <MainPageBase>
                    Test
                </MainPageBase>
            </div>
        </ApolloProvider>

    )
}