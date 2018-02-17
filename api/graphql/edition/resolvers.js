const Edition = require("../../schema/edition");

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Edition.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Edition.findAsync({}, "", {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createEdition = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newEdition = new Edition({
      name: args.name,
      sign_from: args.sign_from,
      sign_to: args.sign_to,
      results_from: args.results_from,
      results_to: args.results_to
    });

    newEdition
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateEdition = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Edition.findByIdAndUpdate(args.id, args)
      .then(res => {
        if (!res) reject("not found");
        resolve({ res, ...args });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteEdition = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Edition.findById(args.id)
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
