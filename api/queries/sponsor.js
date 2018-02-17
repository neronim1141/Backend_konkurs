const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const sponsorType = require('../types/sponsor');
const resolvers = require('../resolvers/sponsor');
const queries = {
  sponsor: {
    type: sponsorType,
    description: 'return one sponsor by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  sponsors: {
    type: new GraphQLList(sponsorType),
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
