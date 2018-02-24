const Class = require('../../schema/class');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Class.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Class.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createClass = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAssigned(args.school, reject);
    var newClass = new Class({
      school: args.school,
      guardian: args.guardian,
      language: args.language,
      code: args.code,
      year: args.year,
      result: args.result
    });

    newClass
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateClass = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    Class.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');
        new AuthValidate(context.user).isAssigned(res.school, reject);

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteClass = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    Class.findByIdAsync(args.id)
      .then(res => {
        if (!res) reject('not found');
        new AuthValidate(context.user).isAssigned(res.school, reject);

        res
          .removeAsync((err, res) => {
            if (err) reject(err);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })

      .catch(err => {
        reject(err);
      });
  });
};
//#endregion
