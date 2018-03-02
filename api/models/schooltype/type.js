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
  name: 'SchoolType',
  fields: () => {
    return {
      id: { type: GraphQLID },
      type: { type: GraphQLString },
      group: { type: GraphQLString }
    };
  }
});
