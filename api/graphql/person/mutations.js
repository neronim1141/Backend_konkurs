const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const PersonType = require('../../types/person');
const resolvers = require('./resolvers');
const mutations = {
  createPerson: {
    type: PersonType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: GraphQLString
      },
      telephone: {
        type: GraphQLString
      }
    },
    resolve: resolvers.create
  },
  removePerson: {
    type: PersonType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updatePerson: {
    type: PersonType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      telephone: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
