const graphql = require('graphql');

const type = require('../../../api/types/address');

const fieldsType = {
  id: graphql.GraphQLID,
  name: graphql.GraphQLString,
  street: graphql.GraphQLString,
  postcode: graphql.GraphQLString,
  city: graphql.GraphQLString
};

module.exports = {
  type,
  fieldsType
};
