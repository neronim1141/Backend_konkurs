const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const ApplicationType = require('../../types/application');
const resolvers = require('./resolvers');
const mutations = {
  createApplication: {
    type: ApplicationType,
    args: {
      school: {
        type: new GraphQLNonNull(GraphQLString)
      },
      edition: {
        type: new GraphQLNonNull(GraphQLString)
      },
      classes: {
        type: new GraphQLNonNull(GraphQLString)
      },
      status: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createApplication
  },
  removeApplication: {
    type: ApplicationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteApplication
  },
  updateApplication: {
    type: ApplicationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      school: {
        type: GraphQLString
      },
      edition: {
        type: GraphQLString
      },
      classes: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateApplication
  }
};

module.exports = mutations;
