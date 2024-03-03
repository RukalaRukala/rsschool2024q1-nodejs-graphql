import {GraphQLObjectType, GraphQLString} from "graphql/type/index.js";
import {prisma} from "../rootQuery.js";
import {IUser, userType} from "./userType.js";
import {UUIDType} from "./uuid.js";

export interface IPost {
    id: string;
    title: string;
    content: string;
    author: IUser;
    authorId: string;
}

export const postType: GraphQLObjectType<IPost> = new  GraphQLObjectType(
    {
        name: 'PostType',
        fields: () => ({
            id: {type: UUIDType},
            title:{type: GraphQLString},
            content: {type: GraphQLString},

            authorId: {type: UUIDType},
            author: {
                type: userType,
                resolve: async (thisPost) => {
                    return await prisma.user.findUnique({where: {id: thisPost.authorId}})
                }
            },
        })
    });