const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const ApplicationType = require('./type');
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
        type: new GraphQLNonNull(new GraphQLList(GraphQLString))
      },
      status: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeApplication: {
    type: ApplicationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
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
        type: new GraphQLList(GraphQLString)
      },
      status: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
