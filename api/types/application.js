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
  name: "Application",
  fields: () => {
    const SchoolType = require("../types/school");
    const EditionType = require("../types/edition");
    const ClassesType = require("../types/edition");
    return {
      id: { type: GraphQLID },
      school: { type: SchoolType },
      edition: { type: EditionType },
      classes: { type: new GraphQLList(ClassesType) },
      status: { type: GraphQLString }
    };
  }
});
