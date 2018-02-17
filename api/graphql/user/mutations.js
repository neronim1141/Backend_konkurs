const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLID
} = require('graphql');
const UserType = require('./type');
const resolvers = require('./resolvers');
const mutations = {
  //#region part of crud
  createUser: {
    type: UserType,
    args: {
      login: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      schoolEmail: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createUser
  },
  removeUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteUser
  },
  updateUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      login: { type: GraphQLString },
      email: {
        type: GraphQLString
      },
      schoolEmail: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateUser
  },
  //#endregion
  //#region Auth
  login: {
    type: new GraphQLObjectType({
      fields: {
        user: { type: UserType },
        token: { type: GraphQLString }
      }
    }),

    args: {
      login: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      alwaysLogged: {
        type: GraphQLBoolean
      }
    },
    resolve: resolvers.login
  }
};

module.exports = mutations;
