const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Committee',
  fields: () => {
    const RegionsType = require('../region').type;
    const AddressType = require('../address').type;
    const PersonType = require('../person').type;
    return {
      id: { type: GraphQLID },
      group: { type: GraphQLString },
      email: { type: GraphQLString },
      www: { type: GraphQLString },
      fax: { type: GraphQLString },
      telephone: { type: GraphQLString },
      regions: { type: new GraphQLList(RegionsType) },
      address: { type: AddressType },
      chairman: { type: PersonType }
    };
  }
});
