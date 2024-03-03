import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType,
} from "graphql/type/index.js";
import {IUser, userType} from "./userType.js";
import {prisma} from "../rootQuery.js";
import {UUIDType} from "./uuid.js";
import {IMemberType, memberType, MemberTypeId} from "./memberType.js";

export interface IProfile {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    user: IUser;
    userId: string;
    memberType: IMemberType;
    memberTypeId: string;

}

export const profileType: GraphQLObjectType<IProfile> = new  GraphQLObjectType(
    {
        name: 'ProfileType',
        fields: () => ({
            id: {type: UUIDType},
            isMale: {type: GraphQLBoolean},
            yearOfBirth: {type: GraphQLInt},

            userId: {type: UUIDType},
            user: {
                type: userType,
                resolve: async (thisProfile) => {
                    return await prisma.user.findUnique({where: {id: thisProfile.userId}})
                },
            },
            memberTypeId: { type: MemberTypeId },
            memberType: {
                type: memberType,
                resolve: async (thisProfile) =>
                    await prisma.memberType.findFirst({ where: { id: thisProfile.memberTypeId } }),
            },
        })
    });