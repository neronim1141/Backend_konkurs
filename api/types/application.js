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
  name: 'Application',
  fields: () => {
    const SchoolType = require('../types/school');
    const EditionType = require('../types/edition');
    const ClassType = require('../types/class');
    return {
      id: { type: GraphQLID },
      school: { type: SchoolType },
      edition: { type: EditionType },
      classes: { type: new GraphQLList(ClassType) },
      status: { type: GraphQLString }
    };
  }
});
