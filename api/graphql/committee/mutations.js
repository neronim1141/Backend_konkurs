const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const CommitteeType = require('../../types/committee');
const resolvers = require('./resolvers');
const mutations = {
  createCommittee: {
    type: CommitteeType,
    args: {
      group: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      www: {
        type: new GraphQLNonNull(GraphQLString)
      },
      fax: {
        type: new GraphQLNonNull(GraphQLString)
      },
      regions: {
        type: new GraphQLNonNull(GraphQLString)
      },
      adress: {
        type: new GraphQLNonNull(GraphQLString)
      },
      chairman: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createCommittee
  },
  removeCommittee: {
    type: CommitteeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteCommittee
  },
  updateCommittee: {
    type: CommitteeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      group: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      www: {
        type: GraphQLString
      },
      fax: {
        type: GraphQLString
      },
      telephone: {
        type: GraphQLString
      },
      regions: {
        type: GraphQLString
      },
      adress: {
        type: GraphQLString
      },
      chairman: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateCommittee
  }
};

module.exports = mutations;
