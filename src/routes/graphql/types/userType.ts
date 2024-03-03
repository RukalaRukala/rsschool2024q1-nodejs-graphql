import {GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {IProfile, profileType} from "./profileType.js";
import {prisma} from "../rootQuery.js";
import {IPost, postType} from "./postType.js";
import {UUIDType} from "./uuid.js";

export interface IUser {
    id: string;
    name: string;
    balance: number;
    profile: IProfile;
    posts: IPost;
    userSubscribedTo: IUser;
    subscribedToUser: IUser;
}

export const userType: GraphQLObjectType<IUser> = new  GraphQLObjectType(
{
    name: 'UserType',
    fields: () => ({
        id: {type: UUIDType},
        name:{type: GraphQLString},
        balance: {type: GraphQLFloat},

        profile: {
            type: profileType,
            resolve: async (thisUser) => {
                await prisma.profile.findUnique({where: {userId: thisUser.id}})
            },
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async (thisUser) => {
                await prisma.post.findMany({where: {authorId: thisUser.id}})
            },
        },
        userSubscribedTo: {
            type: userType,
            resolve: async (thisUser) => {
                const results = await prisma.subscribersOnAuthors.findMany({
                    where: { subscriberId: thisUser.id },
                    select: { author: true },
                });

                return results.map((result) => result.author);
            },
        },
        subscribedToUser: {
            type: new GraphQLList(userType),
            resolve: async (thisUser) => {
                const results = await prisma.subscribersOnAuthors.findMany({
                    where: { authorId: thisUser.id },
                    select: { subscriber: true },
                });
                return results.map((result) => result.subscriber);
            },
        },
    })
});
