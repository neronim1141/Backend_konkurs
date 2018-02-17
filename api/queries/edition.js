const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const editionType = require('../types/edition');
const resolvers = require('../resolvers/edition');
const queries = {
  edition: {
    type: editionType,
    description: 'return one edition by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  editions: {
    type: new GraphQLList(editionType),
    description: 'return list of editions',
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
