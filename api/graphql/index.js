const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const Address = require('./address');
const Application = require('./application');
const Class = require('./class');
const Committee = require('./committee');
const Edition = require('./edition');
const Person = require('./person');
const Province = require('./province');
const Region = require('./region');
const School = require('./school');
const SchoolType = require('./schooltype');
const Sponsor = require('./sponsor');
const User = require('./user');

module.exports.queries = new GraphQLObjectType({
  name: 'Query', //Return this type of object
  fields: () => ({
    ...Address.queries,
    ...Application.queries,
    ...Class.queries,
    ...Committee.queries,
    ...Edition.queries,
    ...Person.queries,
    ...Province.queries,
    ...Region.queries,
    ...School.queries,
    ...SchoolType.queries,
    ...Sponsor.queries,
    ...User.queries
  })
});
module.exports.mutations = new GraphQLObjectType({
  name: 'Mutation', //Return this type of object
  fields: () => ({
    ...Sponsor.mutations
  })
});
