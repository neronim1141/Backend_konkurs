const Address = require('../../schema/address');
const AuthValidate = require('../../../auth/validate');

//#region Read object
module.exports.getOne = (parentValue, args, context) => {
  return Address.findByIdAsync(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Address.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

// TODO: save address creator also?
//#region Create Update Delete
module.exports.createAddress = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAuthenticated(reject);

    var newAddress = new Address({
      name: args.name,
      street: args.street,
      postcode: args.postcode,
      city: args.city
    });

    newAddress
      .saveAsync((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateAddress = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAssigned(reject);

    Address.findByIdAndUpdateAsync(args.id, args, { new: true })
      .then(res => {
        if (!res) reject('not found');
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteAddress = (parentValue, args, context) => {
  return new Promise((resolve, reject) => {
    new AuthValidate(context.user).isAssigned(reject);

    Address.findByIdAsync(args.id)
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
