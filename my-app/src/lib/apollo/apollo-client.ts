"use client"
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    defaultDataIdFromObject
} from '@apollo/client'
import {SetContextLink} from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'
import { getSupabaseBrowserClient, SUPABASE_ANON_KEY } from '@/lib/supabase/client'
const cache = new InMemoryCache({
    dataIdFromObject(responseObject) {
        if ('nodeId' in responseObject) {
            return `${responseObject.nodeId}`
        }
        return defaultDataIdFromObject(responseObject)
    },
    possibleTypes: { Node: ['Todos'] }, // optional, but useful to specify supertype-subtype relationships
    typePolicies: {
        Query: {
            fields: {
                todosCollection: relayStylePagination(), // example of paginating a collection
                node: {
                    read(_, { args, toReference }) {
                        const ref = toReference({
                            nodeId: args?.nodeId,
                        })
                        return ref
                    },
                },
            },
        },
    },
})
const httpLink = new HttpLink({
    uri: 'https://effmvzaroxnvuudkabrc.supabase.co/graphql/v1',
})
const authLink = new SetContextLink(async ({headers}) => {
    const supabase = getSupabaseBrowserClient()
    const token = (await supabase.auth.getSession()).data.session?.access_token
    return {
        headers: {
            ...headers,
            //Authorization: token ? `Bearer ${token}` : '',
            apikey: "sb_publishable_Yvbuyhciub9VMINQyDYdMQ_zY-up8g_",
        },
    }
})
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
})
export default apolloClient