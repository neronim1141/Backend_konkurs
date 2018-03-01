const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const SponsorType = require('../../types/sponsor');
const resolvers = require('./resolvers');
const mutations = {
  createSponsor: {
    type: SponsorType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      site: {
        type: new GraphQLNonNull(GraphQLString)
      },
      image: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeSponsor: {
    type: SponsorType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
  },
  updateSponsor: {
    type: SponsorType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      site: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
