import {GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {IProfile, profileType} from "./profileType.js";
import {prisma} from "../rootQuery.js";
import {IPost, postType} from "./postType.js";

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
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        balance: {type: GraphQLFloat},

        profile: {
            type: profileType,
            resolve: async (thisUser, args, context, info) => {
                await prisma.profile.findUnique({where: {userId: thisUser.id}})
            },
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async (thisUser, args, context, info) => {
                await prisma.post.findMany({where: {authorId: thisUser.id}})
            },
        },
        // userSubscribedTo SubscribersOnAuthors[] @relation("subscriber")
        // subscribedToUser SubscribersOnAuthors[] @relation("author")
    })
});
