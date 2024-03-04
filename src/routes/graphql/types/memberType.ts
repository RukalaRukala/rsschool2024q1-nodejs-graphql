import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
} from "graphql/type/index.js";
import {IProfile, profileType} from "./profileType.js";
import {prisma} from "../rootQuery.js";
import { GraphQLEnumType } from 'graphql';

export interface IMemberType {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
    profile: IProfile;
}

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: { value: 'basic' },
        business: { value: 'business' },
    },
});

export const memberType: GraphQLObjectType<IMemberType> = new  GraphQLObjectType(
    {
        name: 'MemberType',
        fields: () => ({
            id: {type: MemberTypeId},
            discount: {type: GraphQLFloat},
            postsLimitPerMonth: {type: GraphQLInt},

            profiles: {
                type: new GraphQLList(profileType),
                resolve: async (thisMemberType) =>
                    await prisma.profile.findMany({where: {memberTypeId: thisMemberType.id}}),
            },
        })
    });