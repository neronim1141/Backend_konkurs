const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const SchoolType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  schoolCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  school: {
    type: SchoolType,
    description: 'return one School by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  schools: {
    type: new GraphQLList(SchoolType),
    description: 'return list of Schools',
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
