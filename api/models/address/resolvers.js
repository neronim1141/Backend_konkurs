const schema = require('./schema');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return schema.getOne(args.id);
};
module.exports.getList = (parentValue, args, context) => {
  return schema.getList(args);
};
//#endregion

// TODO: save address creator also?
//#region Create Update Delete
module.exports.create = (parentValue, args, context) => {
  new AuthValidate(context.user).isAuthenticated();
  return schema.createNew(args);
};

module.exports.update = (parentValue, { id, ...args }, context) => {
  new AuthValidate(context.user).isAssigned();
  return schema.updateId(id, args);
};

module.exports.delete = (parentValue, args, context) => {
  new AuthValidate(context.user).isAssigned();
  return schema.deleteId(args.id);
};

//#endregion
module.exports.count = (parentValue, args, context) => {
  return schema.count();
};
