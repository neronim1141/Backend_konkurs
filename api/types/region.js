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
  name: 'Region',
  fields: () => {
    const ProvinceType = require('../types/province');
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      province: { type: ProvinceType }
    };
  }
});
