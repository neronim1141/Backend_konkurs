const SchoolType = require('../../schema/schooltype');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return SchoolType.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return SchoolType.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion
