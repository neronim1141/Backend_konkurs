const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const SchoolType = require('../../types/school');
const resolvers = require('./resolvers');
const mutations = {
  createSchool: {
    type: SchoolType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      address: {
        type: new GraphQLNonNull(GraphQLString)
      },
      schoolType: {
        type: new GraphQLNonNull(GraphQLString)
      },
      director: {
        type: new GraphQLNonNull(GraphQLString)
      },
      province: {
        type: new GraphQLNonNull(GraphQLString)
      },
      region: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      patron: {
        type: new GraphQLNonNull(GraphQLString)
      },
      telephone: {
        type: new GraphQLNonNull(GraphQLString)
      },
      fax: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createSchool
  },
  removeSchool: {
    type: SchoolType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteSchool
  },
  updateSchool: {
    type: SchoolType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      address: {
        type: GraphQLString
      },
      schoolType: {
        type: GraphQLString
      },
      director: {
        type: GraphQLString
      },
      province: {
        type: GraphQLString
      },
      region: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      patron: {
        type: GraphQLString
      },
      telephone: {
        type: GraphQLString
      },
      fax: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateSchool
  }
};

module.exports = mutations;
