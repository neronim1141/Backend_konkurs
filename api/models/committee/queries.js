const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const CommitteeType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  committeeCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  committee: {
    type: CommitteeType,
    description: 'return one Committee by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  committees: {
    type: new GraphQLList(CommitteeType),
    description: 'return list of Committees',
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
