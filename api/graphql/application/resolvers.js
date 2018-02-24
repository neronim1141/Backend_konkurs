const Application = require('../../schema/application');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Application.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getListAsync = (parentValue, args, context) => {
  // throw 'not logged';
  return Application.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createApplication = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAssigned(args.school, reject);

    var newApplication = new Application({
      school: args.school,
      edition: args.edition,
      classes: args.classes,
      status: args.status
    });

    newApplication
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateApplication = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    Application.findByIdAndUpdateAsync(args.id, args, { new: true })
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

module.exports.deleteApplication = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    Application.findByIdAsync(args.id)
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
