const Address = require('../../schema').address;
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Address.getOne(args.id);
};
module.exports.getList = (parentValue, args, context) => {
  return Address.getList(args);
};
//#endregion

// TODO: save address creator also?
//#region Create Update Delete
module.exports.createAddress = (parentValue, args, context) => {
  new AuthValidate(context.user).isAuthenticated();
  return Address.createNew({
    name: args.name,
    street: args.street,
    postcode: args.postcode,
    city: args.city
  });
};

module.exports.updateAddress = (parentValue, { id, ...args }, context) => {
  new AuthValidate(context.user).isAssigned();
  return Address.updateId(id, args);
};

module.exports.deleteAddress = (parentValue, args, context) => {
  new AuthValidate(context.user).isAssigned(reject);
  return Address.deleteId(args.id);
};
//#endregion
