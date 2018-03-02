const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const CommitteeType = require('./type');
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
      telephone: {
        type: new GraphQLNonNull(GraphQLString)
      },
      address: {
        type: new GraphQLNonNull(GraphQLString)
      },
      chairman: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.create
  },
  removeCommittee: {
    type: CommitteeType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.delete
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
      address: {
        type: GraphQLString
      },
      chairman: {
        type: GraphQLString
      }
    },
    resolve: resolvers.update
  }
};

module.exports = mutations;
