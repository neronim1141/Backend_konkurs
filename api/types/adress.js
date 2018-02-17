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
  name: "Adress",
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      street: { type: GraphQLString },
      postcode: { type: GraphQLString },
      city: { type: GraphQLString }
    };
  }
});
