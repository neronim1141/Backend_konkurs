const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const SchoolTypeType = require('../../types/schooltype');
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
    resolve: resolvers.createSchoolType
  },
  removeSchoolType: {
    type: SchoolTypeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteSchoolType
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
    resolve: resolvers.updateSchoolType
  }
};

module.exports = mutations;
