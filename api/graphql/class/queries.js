const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const ClassType = require('../../types/class');
const resolvers = require('./resolvers');
const queries = {
  Class: {
    type: ClassType,
    description: 'return one Class by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  Classes: {
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
