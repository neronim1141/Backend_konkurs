const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require("graphql");
const ClassType = require("../../types/class");
const resolvers = require("./resolvers");
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
    resolve: resolvers.createClass
  },
  removeClass: {
    type: ClassType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteClass
  },
  updateClass: {
    type: ClassType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      school: {
        school: GraphQLString
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
    resolve: resolvers.updateClass
  }
};

module.exports = mutations;
