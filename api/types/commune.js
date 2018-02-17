const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Province',
  fields: () => {
    const RegionType = require('../types/regione');
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      region: { type: RegionType }
    };
  }
});
