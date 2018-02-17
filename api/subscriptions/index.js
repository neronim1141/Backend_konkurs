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
  name: 'Subscription',
  fields: () => ({})
});
