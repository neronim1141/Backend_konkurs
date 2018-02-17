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
      name: { type: GraphQLString, description: 'name of edition' },
      sign_from: {
        type: GraphQLString,
        description: 'since when you can sign up'
      },
      sign_in: {
        type: GraphQLString,
        description: 'until when you can sign up'
      },
      results_from: {
        type: GraphQLString,
        description: 'since when the results can appear'
      },
      results_in: {
        type: GraphQLString,
        description: 'until when the results should appear'
      }
    };
  }
});
