const Application = require("../../schema/application");

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Application.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Application.findAsync({}, "", {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createApplication = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newApplication = new Application({
      school: args.school,
      edition: args.edition,
      classes: args.classes,
      status: args.status
    });

    newApplication
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateApplication = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Application.findByIdAndUpdate(args.id, args)
      .then(res => {
        if (!res) reject("not found");
        resolve({ res, ...args });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteApplication = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Application.findById(args.id)
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
