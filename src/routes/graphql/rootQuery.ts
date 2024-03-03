import {
    GraphQLList, GraphQLNonNull,
    GraphQLObjectType,
} from "graphql/type/index.js";
import {PrismaClient} from "@prisma/client";
import {memberType, MemberTypeId} from "./types/memberType.js";
import {UUIDType} from "./types/uuid.js";
import {profileType} from "./types/profileType.js";
import {postType} from "./types/postType.js";
import {userType} from "./types/userType.js";

export const prisma = new PrismaClient();

export const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        memberTypes: {
            type: new GraphQLList(memberType),
            resolve: async () => {
                try {
                    return await prisma.memberType.findMany();
                } catch (error) {
                    console.error('Error in getting memberType list:', error);
                    throw new Error('Error in getting memberType list');
                }
            },
        },
        memberType: {
            type: memberType,
            args: {id: {type: new GraphQLNonNull(MemberTypeId)}},
            resolve: async (_, givenId) => {
                try {
                    return await prisma.memberType.findFirst({ where: givenId});
                } catch (error) {
                    console.error('Error in getting memberType:', error);
                    throw new Error('Error in getting memberType');
                }
            },
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async () => {
                try {
                    return await prisma.post.findMany();
                } catch (error) {
                    console.error('Error in getting post list:', error);
                    throw new Error('Error in getting post list');
                }
            },
        },
        post: {
            type: postType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, givenId) => {
                try {
                    return await prisma.post.findFirst({ where: givenId });
                } catch (error) {
                    console.error('Error in getting post:', error);
                    throw new Error('Error in getting post');
                }
            }

        },
        users: {
            type: new GraphQLList(userType),
            resolve: async () => {
                try {
                    return await prisma.user.findMany();
                } catch (error) {
                    console.error('Error in getting user list:', error);
                    throw new Error('Error in getting user list');
                }
            },
        },
        user: {
            type: userType,
            args: { id: { type: UUIDType } },
            resolve: async (_, givenId) => {
                try {
                    return await prisma.user.findFirst({ where: givenId });
                } catch (error) {
                    console.error('Error in getting user:', error);
                    throw new Error('Error in getting user');
                }
            }

        },
        profiles: {
            type: new GraphQLList(profileType),
            resolve: async () => {
                try {
                    return await prisma.profile.findMany();
                } catch (error) {
                    console.error('Error in getting profile list:', error);
                    throw new Error('Error in getting profile list');
                }
            },
        },
        profile: {
            type: profileType,
            args: { id: { type: UUIDType } },
            resolve: async (_, givenId) => {
                try {
                    return await prisma.profile.findFirst({ where: givenId });
                } catch (error) {
                    console.error('Error in getting profile:', error);
                    throw new Error('Error in getting profile');
                }
            }
        },
    }),
})