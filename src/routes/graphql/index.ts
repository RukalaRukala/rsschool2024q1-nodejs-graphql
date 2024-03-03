import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {createGqlResponseSchema, gqlResponseSchema} from './schemas.js';
import {graphql, parse, validate} from 'graphql';
import {graphQLSchema} from "./graphGLSchema.js";
import depthLimit from "graphql-depth-limit";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const NodeTree = parse(query);
      const queryDepth = validate(graphQLSchema, NodeTree, [depthLimit(5)]);

      if (queryDepth.length > 0) {
        return { errors: queryDepth };
      }
      return await graphql({schema: graphQLSchema, source: query, variableValues: variables});
    },
  });
};

export default plugin;
