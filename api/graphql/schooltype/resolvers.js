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

//#region Create Update Delete
module.exports.createSchoolType = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newSchoolType = new SchoolType({
      type: args.type,
      group: args.group
    });
    newSchoolType
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateSchoolType = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    SchoolType.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteSchoolType = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    SchoolType.findById(args.id)
      .then(res => {
        if (!res) reject('not found');
        res
          .remove((err, res) => {
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
