const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const EditionType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  editionCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  edition: {
    type: EditionType,
    description: 'return one edition by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  editions: {
    type: new GraphQLList(EditionType),
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
