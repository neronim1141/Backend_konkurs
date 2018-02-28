const Sponsor = require('../../schema/sponsor');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Sponsor.findByIdAsync(args.id).then(res => {
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
module.exports.createSponsor = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    console.log(context.user);
    new AuthValidate(context.user).hasRole('admin', reject);
    var newSponsor = new Sponsor({
      name: args.name,
      site: args.site,
      image: args.image
    });

    newSponsor
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateSponsor = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    Sponsor.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteSponsor = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).hasRole('admin', reject);

    Sponsor.findByIdAsync(args.id)
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
