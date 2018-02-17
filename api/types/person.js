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
  name: 'Edition',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      lastName: { type: GraphQLString },
      title: { type: GraphQLString },
      email: { type: GraphQLString },
      telephone: { type: GraphQLString }
    };
  }
});
