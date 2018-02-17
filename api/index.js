const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const RootQuery = require('./queries');
// const RootMutation = require('./mutations');
// const RootSubscription = require('./subscriptions');

const schema = new GraphQLSchema({
  query: RootQuery
  //   mutation: RootMutation,
  //   subscription: RootSubscription
});

module.exports = schema;
