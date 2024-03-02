import {GraphQLSchema} from "graphql/type/index.js";
import {rootQuery} from "./rootQuery.js";
import {rootMutation} from "./rootMutation.js";

export const graphQLSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})