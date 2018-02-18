const Edition = require('../../schema/edition');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Edition.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Edition.findAsync({}, '', {
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
      .saveAsync((err, res) => {
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
    Edition.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteEdition = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Edition.findByIdAsync(args.id)
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
