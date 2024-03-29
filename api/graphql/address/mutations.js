const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require("graphql");
const AddressType = require("../../types/address");
const resolvers = require("./resolvers");
const mutations = {
  createAddress: {
    type: AddressType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      street: {
        type: new GraphQLNonNull(GraphQLString)
      },
      postcode: {
        type: new GraphQLNonNull(GraphQLString)
      },
      city: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.createAddress
  },
  removeAddress: {
    type: AddressType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolvers.deleteAddress
  },
  updateAddress: {
    type: AddressType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      street: {
        type: GraphQLString
      },
      postcode: {
        type: GraphQLString
      },
      city: {
        type: GraphQLString
      }
    },
    resolve: resolvers.updateAddress
  }
};

module.exports = mutations;
