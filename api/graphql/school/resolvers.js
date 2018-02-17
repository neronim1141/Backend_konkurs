const User = require('../../schema/user');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return User.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return User.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createSchool = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newSchool = new School({
      name: args.name,
      address: args.address,
      schoolType: args.schoolType,
      director: args.director,
      province: args.province,
      region: args.region,
      email: args.email,
      patron: args.patron,
      telephone: args.telephone,
      fax: args.fax
    });
    newSchool
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateSchool = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    School.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteSchool = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    School.findById(args.id)
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
