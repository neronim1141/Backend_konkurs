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
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    };
  }
});
