import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
} from "graphql/type/index.js";
import {IUser, userType} from "./userType.js";
import {prisma} from "../rootQuery.js";

export interface IProfile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    user: IUser;
    userId: string;

}

export const profileType: GraphQLObjectType<IProfile> = new  GraphQLObjectType(
    {
        name: 'ProfileType',
        fields: () => ({
            id: {type: GraphQLID},
            isMale: {type: GraphQLBoolean},
            yearOfBirth: {type: GraphQLInt},

            user: {
                type: userType,
                resolve: async (thisProfile, args, context, info) => {
                    return await prisma.user.findUnique({where: {id: thisProfile.userId}})
                },
            },
            userId: {
                type: GraphQLID,
                resolve: async ({id}) => {
                    return await prisma.user.findUnique({where: {id: id}})
                }
            },
            // memberType   MemberType @relation(fields: [memberTypeId], references: [id], onDelete: Restrict)
            memberTypeId: {
                type: GraphQLID,
                resolve: async (thisProfile, args) => {
                    return thisProfile.userId;
                }
            },
        })
    });