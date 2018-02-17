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
  name: "Class",
  fields: () => {
    const SchoolType = require("../types/school");
    const PersonType = require("../types/person");
    const ClassesType = require("../types/edition");
    return {
      id: { type: GraphQLID },
      school: { type: SchoolType },
      guardian: { type: PersonType },
      language: { type: GraphQLString },
      code: { type: GraphQLString },
      year: { type: GraphQLString },
      result: { type: GraphQLString }
    };
  }
});
