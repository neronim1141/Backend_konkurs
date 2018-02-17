const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Committee",
  fields: () => {
    const RegionsType = require("../types/region");
    const AdressType = require("../types/adress");
    const PersonType = require("../types/person");
    return {
      id: { type: GraphQLID },
      group: { type: GraphQLString },
      email: { type: GraphQLString },
      www: { type: GraphQLString },
      fax: { type: GraphQLString },
      telephone: { type: GraphQLString },
      regions: { type: new GraphQLList(RegionsType) },
      adress: { type: AdressType },
      chairman: { type: PersonType }
    };
  }
});
