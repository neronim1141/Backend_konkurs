const Region = require('../../schema/region');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Region.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Region.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createRegion = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    var newRegion = new Region({
      name: args.name,
      province: args.province
    });
    newRegion
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateRegion = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    Region.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteRegion = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    Region.findByIdAsync(args.id)
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
