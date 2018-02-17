const Person = require('../../schema/person');

//#region Read object
module.exports.getOne = (parentValue, args) => {
  return Person.findById(args.id).then(res => {
    // console.log(res);
    return res;
  });
};
module.exports.getList = (parentValue, args, context) => {
  // throw 'not logged';
  return Person.findAsync({}, '', {
    limit: args.first || 0,
    skip: args.offset || 0
  }).then(res => {
    // console.log(res);
    return res;
  });
};
//#endregion

//#region Create Update Delete
module.exports.createPerson = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    var newPerson = new Person({
      name: args.name,
      lastName: args.lastName,
      title: args.title,
      email: args.email,
      telephone: args.telephone
    });
    newPerson
      .save((err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updatePerson = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Person.findByIdAndUpdate(args.id, args, { new: true })
      .then(res => {
        if (!res) throw 'not found';
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.deletePerson = (parentValue, args) => {
  return new Promise((resolve, reject) => {
    Person.findById(args.id)
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
