const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const ProvinceType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  provinceCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  province: {
    type: ProvinceType,
    description: 'return one province by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  provinces: {
    type: new GraphQLList(ProvinceType),
    description: 'return list of provinces',
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
