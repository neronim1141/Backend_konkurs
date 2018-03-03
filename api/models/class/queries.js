const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const ClassType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  classCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  class: {
    type: ClassType,
    description: 'return one Class by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  classes: {
    type: new GraphQLList(ClassType),
    description: 'return list of Classs',
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
