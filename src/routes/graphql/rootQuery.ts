import {GraphQLList, GraphQLObjectType} from "graphql/type/index.js";
import {memberType, post, profile, user} from "./graphQLTypes.js";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        memberTypes: {
            type: new GraphQLList(memberType),
            resolve: async () => {
                try {
                    console.log(await prisma.memberType.findMany());
                    return await prisma.memberType.findMany();
                } catch (error) {
                    console.error('Ошибка при получении списка MemberTypes:', error);
                    throw new Error('Ошибка при получении списка MemberTypes');
                }
            },
        },
        posts: {
            type: new GraphQLList(post),
            resolve: async () => {
                try {
                    console.log(await prisma.post.findMany());
                    return await prisma.post.findMany();
                } catch (error) {
                    console.error('Ошибка при получении списка Post:', error);
                    throw new Error('Ошибка при получении списка Post');
                }
            },
        },
        users: {
            type: new GraphQLList(user),
            resolve: async () => {
                try {
                    console.log(await prisma.user.findMany());
                    return await prisma.user.findMany();
                } catch (error) {
                    console.error('Ошибка при получении списка User:', error);
                    throw new Error('Ошибка при получении списка User');
                }
            },
        },
        profile: {
            type: new GraphQLList(profile),
            resolve: async () => {
                try {
                    console.log(await prisma.profile.findMany());
                    return await prisma.profile.findMany();
                } catch (error) {
                    console.error('Ошибка при получении списка Profile:', error);
                    throw new Error('Ошибка при получении списка Profile');
                }
            },
        }
    },
})