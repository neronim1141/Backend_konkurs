const Region = require('../../schema/region');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Region.findById(args.id).then(res => {
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
module.exports.createRegion = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newRegion = new Region({
      name: args.name,
      province: args.province
    });
    newRegion
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateRegion = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Region.findByIdAndUpdate(args.id, args)
      .then(res => {
        if (!res) reject('not found');
        resolve({ res, ...args });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteRegion = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Region.findById(args.id)
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
