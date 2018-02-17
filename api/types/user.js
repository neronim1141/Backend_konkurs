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
  name: 'User',
  fields: () => {
    return {
      id: { type: GraphQLID },
      login: { type: GraphQLString },
      email: { type: GraphQLString },
      schoolEmail: { type: GraphQLString },
      role: { type: GraphQLString },
      creationTime: { type: GraphQLString }
    };
  }
});
