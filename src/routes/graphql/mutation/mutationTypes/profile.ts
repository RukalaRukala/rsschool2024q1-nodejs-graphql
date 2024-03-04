import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import {MemberTypeId} from "../../types/memberType.js";

export const newProfile = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: () => ({
        userId: { type: new GraphQLNonNull(UUIDType) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    }),
});

export const changedProfile = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: () => ({
        memberTypeId: { type: MemberTypeId },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
    }),
});