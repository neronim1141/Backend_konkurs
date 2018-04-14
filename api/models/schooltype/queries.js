const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const SchoolTypeType = require('./type');
const resolvers = require('./resolvers');
const queries = {
  schoolTypeCount: {
    type: GraphQLInt,
    resolve: resolvers.count
  },
  schoolType: {
    type: SchoolTypeType,
    description: 'return one SchoolType by id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.getOne
  },
  schoolTypes: {
    type: new GraphQLList(SchoolTypeType),
    description: 'return list of SchoolTypes',
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