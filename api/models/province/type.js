const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const regionType = require('../region/type');
const { regions } = require('./resolvers');
module.exports = new GraphQLObjectType({
  name: 'Province',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      regions: {
        type: new GraphQLList(regionType),
        resolve: regions
      }
    };
  }
});
