const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const ClassType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  createClass: {
    type: ClassType,
    args: {
      school: {
        type: new GraphQLNonNull(GraphQLString)
      },
      guardian: {
        type: new GraphQLNonNull(GraphQLString)
      },
      language: {
        type: new GraphQLNonNull(GraphQLString)
      },
      code: {
        type: new GraphQLNonNull(GraphQLString)
      },
      year: {
        type: new GraphQLNonNull(GraphQLString)
      },
      result: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeClass: {
    type: ClassType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updateClass: {
    type: ClassType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      school: {
        type: GraphQLString
      },
      guardian: {
        type: GraphQLString
      },
      language: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      },
      year: {
        type: GraphQLString
      },
      result: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
