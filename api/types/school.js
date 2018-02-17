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
    const SchoolType = require('../types/school');
    const CommitteeType = require('../types/committee');
    const PersonType = require('../types/person');
    const ProvinceType = require('../types/province');
    const RegionType = require('../types/region');
    const ClassType = require('../types/class');
    const AplicationType = require('../types/application');
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      school: { type: SchoolType },
      committee: { type: CommitteeType },
      schoolType: { type: SchoolTypeType },
      director: { type: PersonType },
      province: { type: ProvinceType },
      region: { type: RegionType },
      classes: { type: new GraphQLList(ClassType) },
      aplications: { type: new GraphQLList(AplicationType) },
      teachers: { type: new GraphQLList(PersonType) },
      email: { type: GraphQLString },
      patron: { type: GraphQLString },
      telephone: { type: GraphQLString },
      fax: { type: GraphQLString }
    };
  }
});
