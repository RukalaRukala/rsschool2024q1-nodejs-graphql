import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';

export const newUser = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    }),
});

export const changedUser = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    }),
});