const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const UserType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  userCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  user: {
    type: UserType,
    description: 'return one User by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  users: {
    type: new GraphQLList(UserType),
    description: 'return list of Users',
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
