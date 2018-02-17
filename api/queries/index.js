const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const sponsor = require('./sponsor');
const edition = require('./edition');

module.exports = new GraphQLObjectType({
  name: 'Query', //Return this type of object
  fields: () => ({
    ...sponsor,
    ...edition
  })
});
