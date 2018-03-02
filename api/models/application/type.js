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
    const SchoolType = require('../schooltype').type;
    const EditionType = require('../edition').type;
    const ClassType = require('../class').type;
    return {
      id: { type: GraphQLID },
      school: { type: SchoolType },
      edition: { type: EditionType },
      classes: { type: new GraphQLList(ClassType) },
      status: { type: GraphQLString }
    };
  }
});
