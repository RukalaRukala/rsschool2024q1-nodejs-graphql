import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {prisma} from "../rootQuery.js";
import {IUser, userType} from "./userType.js";

export interface IPost {
    id: string;
    title: string;
    content: string;
    author: IUser;
    authorId: string;
}
export interface IArgs {
    id?: string;
}

export const postType: GraphQLObjectType<IPost> = new  GraphQLObjectType(
    {
        name: 'PostType',
        fields: () => ({
            id: {type: GraphQLID},
            title:{type: GraphQLString},
            content: {type: GraphQLString},

            author: {
                type: userType,
                resolve: async (thisPost) => {
                    return await prisma.user.findUnique({where: {id: thisPost.authorId}})
                }
            },
            authorId: {
                type: GraphQLID,
                resolve: async (thisPost, args) => {
                    const authorId: IUser = await prisma.user.findUnique({where: {id: args.id}}) as IUser;
                    return authorId ? authorId : null;
                }
            }
        })
    });