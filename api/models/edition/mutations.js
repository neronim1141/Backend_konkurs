const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const EditionType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  createEdition: {
    type: EditionType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      sign_from: {
        type: new GraphQLNonNull(GraphQLString)
      },
      sign_to: {
        type: new GraphQLNonNull(GraphQLString)
      },
      results_from: {
        type: new GraphQLNonNull(GraphQLString)
      },
      results_to: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeEdition: {
    type: EditionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updateEdition: {
    type: EditionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      sign_from: {
        type: GraphQLString
      },
      sign_to: {
        type: GraphQLString
      },
      results_from: {
        type: GraphQLString
      },
      results_to: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
