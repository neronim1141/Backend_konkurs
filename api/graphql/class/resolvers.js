const Class = require("../../schema/class");

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Class.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Class.findAsync({}, "", {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createClass = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newClass = new Class({
      school: args.school,
      guardian: args.guardian,
      language: args.language,
      code: args.code,
      year: args.year,
      result: args.result
    });

    newClass
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateClass = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Class.findByIdAndUpdate(args.id, args)
      .then(res => {
        if (!res) reject("not found");
        resolve({ res, ...args });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteClass = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Class.findById(args.id)
      .then(res => {
        if (!res) reject("not found");
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
