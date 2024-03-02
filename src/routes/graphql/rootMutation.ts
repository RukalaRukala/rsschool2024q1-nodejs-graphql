import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {user} from "./graphQLTypes.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: user,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // Обязательный аргумент name
                email: { type: new GraphQLNonNull(GraphQLString) } // Обязательный аргумент email
            },
            resolve: async (_, args) => {
                try {
                    return await prisma.user.create({
                        data: {
                            name: args.name,
                            id: '7',
                            balance: 1.342,
                        }
                    });
                } catch (error) {
                    console.error('Ошибка при создании пользователя:', error);
                    throw new Error('Ошибка при создании пользователя');
                }
            }
        }
    },
})
