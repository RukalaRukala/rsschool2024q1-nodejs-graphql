import {GraphQLObjectType} from "graphql/type/index.js";
import {userType} from "../types/userType.js";
import {GraphQLNonNull} from "graphql/index.js";
import {changedUser, newUser} from "./mutationTypes/user.js";
import {UUIDType} from "../types/uuid.js";
import {postType} from "../types/postType.js";
import {prisma} from "../rootQuery.js";
import {changedPost, newPost} from "./mutationTypes/post.js";
import {profileType} from "../types/profileType.js";
import {changedProfile, newProfile} from "./mutationTypes/profile.js";

export const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: userType,
            args: { dto: { type: new GraphQLNonNull(newUser) } },
            resolve: async (_, newUser) =>
                await prisma.user.create({ data: newUser.dto }),
        },

        changeUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(changedUser) },
            },
            resolve: async (_, args) => {
                const [curId, newData] = [args.id, args.dto];
                return await prisma.user.update({ where: { id: curId }, data: newData });
            }
        },

        deleteUser: {
            type: new GraphQLNonNull(UUIDType),
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args) => {
                await prisma.user.delete({ where: { id: args.id } });
                return args.id;
            },
        },
        createPost: {
            type: postType,
            args: { dto: { type: new GraphQLNonNull(newPost) } },
            resolve: async (_, newPost) =>
                await prisma.post.create({ data: newPost.dto}),
        },

        changePost: {
            type: postType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(changedPost) },
            },
            resolve: async (_, args) => {
                const [curId, newData] = [args.id, args.dto];
                return await prisma.post.update({ where: { id: curId }, data: newData });
            }
        },

        deletePost: {
            type: new GraphQLNonNull(UUIDType),
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args) => {
                await prisma.post.delete({ where: { id: args.id } });
                return args.id;
            },
        },
        createProfile: {
            type: profileType,
            args: { dto: { type: new GraphQLNonNull(newProfile) } },
            resolve: async (_, newProfile) =>
                await prisma.profile.create({ data: newProfile.dto }),
        },

        changeProfile: {
            type: profileType,
            args: {
                id: { type: UUIDType },
                dto: { type: new GraphQLNonNull(changedProfile) },
            },
            resolve: async (_, args) =>
                await prisma.profile.update({ where: { id: args.id }, data: args.dto }),
        },

        deleteProfile: {
            type: new GraphQLNonNull(UUIDType),
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: async (_, args) => {
                await prisma.profile.delete({ where: { id: args.id } });
                return args.id;
            },
        },

        subscribeTo: {
            type: userType,
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args) => {
                await prisma.subscribersOnAuthors.create({
                    data: { subscriberId: args.userId, authorId: args.authorId },
                });
                return await prisma.user.findUnique({ where: { id: args.userId } });
            },
        },

        unsubscribeFrom: {
            type: new GraphQLNonNull(UUIDType),
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args) => {
                await prisma.subscribersOnAuthors.deleteMany({
                    where: { subscriberId: args.userId, authorId: args.authorId },
                });

                return args.authorId;
            },
        },
    }),
})
