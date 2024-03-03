import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
} from "graphql/type/index.js";
import {profileType} from "./profileType.js";
import {prisma} from "../rootQuery.js";
import { GraphQLEnumType } from 'graphql';

export interface IMemberType {
    id: string;
    discount: number;
    postsLimitPerMonth: number;
}

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: {
            value: 'basic',
        },
        business: {
            value: 'business',
        },
    },
});

export const memberType: GraphQLObjectType<IMemberType> = new  GraphQLObjectType(
    {
        name: 'MemberType',
        fields: () => ({
            id: {type: GraphQLID},
            discount: {type: GraphQLFloat},
            postsLimitPerMonth: {type: GraphQLInt},

            profiles: {
                type: new GraphQLList(profileType),
                resolve: async (thisMemberType) => {
                    await prisma.profile.findMany({where: {id: thisMemberType.id}})
                },
            },
        })
    });