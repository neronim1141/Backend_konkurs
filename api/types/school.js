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
    const AddressType = require('../types/address');
    const SchoolTypeType = require('../types/schooltype');
    const CommitteeType = require('../types/committee');
    const PersonType = require('../types/person');
    const ProvinceType = require('../types/province');
    const RegionType = require('../types/region');
    const ClassType = require('../types/class');
    const ApplicationType = require('../types/application');
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
