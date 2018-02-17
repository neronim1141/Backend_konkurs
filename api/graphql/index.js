const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const Edition = require('./edition');
const Sponsor = require('./sponsor');
const Person = require('./person');
const User = require('./User');

module.exports.queries = new GraphQLObjectType({
  name: 'Query', //Return this type of object
  fields: () => ({
    ...Edition.queries,
    ...Sponsor.queries,
    ...Person.queries,
    ...User.queries
  })
});
