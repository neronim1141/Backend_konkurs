const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const PersonType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  personCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  person: {
    type: PersonType,
    description: 'return one Person by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  persons: {
    type: new GraphQLList(PersonType),
    description: 'return list of Persons',
    args: {
      first: {
        type: GraphQLInt,
        description: 'n first results'
      },
      offset: {
        type: GraphQLInt,
        description: 'skip n results'
      }
    },
    resolve: resolvers.getList
  }
};
module.exports = queries;
