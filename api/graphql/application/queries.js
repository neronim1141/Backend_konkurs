const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const ApplicationType = require('../../types/application');
const resolvers = require('./resolvers');
const queries = {
  Application: {
    type: ApplicationType,
    description: 'return one Application by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  Applications: {
    type: new GraphQLList(ApplicationType),
    description: 'return list of Applications',
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
