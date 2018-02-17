const Province = require('../../schema/province');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Province.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Province.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createProvince = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newProvince = new Province({
      name: args.name
    });
    newProvince
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateProvince = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Province.findByIdAndUpdate(args.id, args)
      .then(res => {
        if (!res) reject('not found');
        resolve({ res, ...args });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteProvince = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Province.findById(args.id)
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
