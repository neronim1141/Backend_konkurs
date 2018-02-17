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
  name: 'Sponsor',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString, description: 'name of sponsor' },
      site: { type: GraphQLString, description: 'url to site' },
      image: { type: GraphQLString, description: 'url to image' }
    };
  }
});
