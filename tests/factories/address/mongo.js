const schema = require('../../../api/schema/address');

const fields = ['name', 'street', 'postcode', 'city'];
const required = ['name', 'street', 'postcode', 'city'];

const valid = {
  id: '5a888b94c7263412e48c0e22',
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
const updated = {
  id: '5a888b94c7263412e48c0e22',
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
const invalid = {
  id: '',
  name: '',
  street: '',
  postcode: '',
  city: ''
};
const additionalValidation = require('./mongo/validator');
const additionalMethods = () => {};

module.exports = {
  schema,
  fields,
  required,
  valid,
  invalid,
  updated,
  additionalValidation,
  additionalMethods
};
