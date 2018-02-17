const Address = require('../../schema/address');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Address.findById(args.id).then(res => {
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

//#region Create Update Delete
module.exports.createAddress = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newAddress = new Address({
      name: args.name,
      street: args.street,
      postcode: args.postcode,
      city: args.city
    });

    newAddress
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateAddress = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Address.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deleteAddress = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Address.findById(args.id)
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
