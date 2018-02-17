const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const SponsorType = require('../../types/sponsor');
const resolvers = require('./resolvers');
const queries = {
  sponsor: {
    type: SponsorType,
    description: 'return one sponsor by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  sponsors: {
    type: new GraphQLList(SponsorType),
    description: 'return list of sponsors',
    args: {
      first: {
        type: GraphQLInt,
        description: 'n first results'
      },
      offset: {
        type: GraphQLInt,
        description: 'skip n results'
      }
    },
    resolve: resolvers.getList
  }
};
module.exports = queries;
