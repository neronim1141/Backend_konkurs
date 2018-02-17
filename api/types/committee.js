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
    const RegionsType = require('../types/region');
    const AddressType = require('../types/address');
    const PersonType = require('../types/person');
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
