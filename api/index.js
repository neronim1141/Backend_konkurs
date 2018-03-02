const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const Root = require('./models');

// const RootSubscription = require('./subscriptions');

const schema = new GraphQLSchema({
  query: Root.queries,
  mutation: Root.mutations
  //   subscription: RootSubscription
});

module.exports = schema;
