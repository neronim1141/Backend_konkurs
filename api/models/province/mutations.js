const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const ProvinceType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  createProvince: {
    type: ProvinceType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeProvince: {
    type: ProvinceType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updateProvince: {
    type: ProvinceType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
