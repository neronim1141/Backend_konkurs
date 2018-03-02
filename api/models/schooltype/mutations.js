const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const SchoolTypeType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  createSchoolType: {
    type: SchoolTypeType,
    args: {
      type: {
        type: new GraphQLNonNull(GraphQLString)
      },
      group: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeSchoolType: {
    type: SchoolTypeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updateSchoolType: {
    type: SchoolTypeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      type: {
        type: GraphQLString
      },
      group: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
