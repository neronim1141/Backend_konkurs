const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const addressType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  addressCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  address: {
    type: addressType,
    description: 'return one address by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  addresses: {
    type: new GraphQLList(addressType),
    description: 'return list of addresss',
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
