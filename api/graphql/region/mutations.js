const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const RegionType = require('../../types/region');
const resolvers = require('./resolvers');
const mutations = {
  createRegion: {
    type: RegionType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      province: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createRegion
  },
  removeRegion: {
    type: RegionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteRegion
  },
  updateRegion: {
    type: RegionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      province: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateRegion
  }
};

module.exports = mutations;
