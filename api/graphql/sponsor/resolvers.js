const Sponsor = require('../../schema/sponsor');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Sponsor.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Sponsor.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createSponsor = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newSponsor = new Sponsor({
      name: args.name,
      site: args.site,
      image: args.image
    });

    newSponsor
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateSponsor = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Sponsor.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteSponsor = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Sponsor.findById(args.id)
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
