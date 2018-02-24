const SchoolType = require('../../schema/schooltype');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return SchoolType.findByIdAsync(args.id).then(res => {
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

//#region Create Update Delete
module.exports.createSchoolType = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    var newSchoolType = new SchoolType({
      type: args.type,
      group: args.group
    });
    newSchoolType
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateSchoolType = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    SchoolType.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteSchoolType = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    SchoolType.findByIdAsync(args.id)
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
