const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const Root = require('./graphql');
// const RootMutation = require('./mutations');
// const RootSubscription = require('./subscriptions');

const schema = new GraphQLSchema({
  query: Root.queries
  //   mutation: RootMutation,
  //   subscription: RootSubscription
});

module.exports = schema;
