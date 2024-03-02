import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType, GraphQLString,
} from "graphql/type/index.js";

export const memberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        discount: {type: new GraphQLNonNull(GraphQLFloat)},
        postsLimitPerMonth: {type: new GraphQLNonNull(GraphQLInt)},
    }
});

export const post = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
    }
});

export const user = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        balance: {type: new GraphQLNonNull(GraphQLFloat)},
    }
});

export const profile = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLBoolean)},
        balance: {type: new GraphQLNonNull(GraphQLInt)},
    }
});