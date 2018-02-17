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
  name: 'City',
  fields: () => {
    const CommuneType = require('../types/commune');
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      commune: { type: CommuneType }
    };
  }
});
