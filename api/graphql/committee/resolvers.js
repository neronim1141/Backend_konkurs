const Committee = require('../../schema/committee');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Committee.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Committee.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createCommittee = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newCommittee = new Committee({
      group: args.group,
      email: args.email,
      www: args.www,
      fax: args.fax,
      telephone: args.telephone,
      regions: args.regions,
      adress: args.adress,
      chairman: args.chairman
    });

    newCommittee
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateCommittee = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Committee.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteCommittee = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Committee.findById(args.id)
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
