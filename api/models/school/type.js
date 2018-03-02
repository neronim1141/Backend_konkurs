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
  name: 'School',
  fields: () => {
    const AddressType = require('../address').type;
    const SchoolTypeType = require('../schooltype').type;
    const CommitteeType = require('../committee').type;
    const PersonType = require('../person').type;
    const ProvinceType = require('../province').type;
    const RegionType = require('../region').type;
    const ClassType = require('../class').type;
    const ApplicationType = require('../application').type;
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      address: { type: AddressType },
      schoolType: { type: SchoolTypeType },
      director: { type: PersonType },
      province: { type: ProvinceType },
      region: { type: RegionType },
      classes: { type: new GraphQLList(ClassType) },
      applications: { type: new GraphQLList(ApplicationType) },
      teachers: { type: new GraphQLList(PersonType) },
      email: { type: GraphQLString },
      patron: { type: GraphQLString },
      telephone: { type: GraphQLString },
      fax: { type: GraphQLString }
    };
  }
});
