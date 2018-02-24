const Committee = require('../../schema/committee');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Committee.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Committee.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createCommittee = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);
    var newCommittee = new Committee({
      group: args.group,
      email: args.email,
      www: args.www,
      fax: args.fax,
      telephone: args.telephone,
      address: args.address,
      chairman: args.chairman
    });

    newCommittee
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateCommittee = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAssigned(args.is, reject);

    Committee.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteCommittee = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    Committee.findByIdAsync(args.id)
      .then(res => {
        if (!res) reject('not found');
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
