var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var customErrors = require('../../../utility/errors');
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      validate: {
        validator: function(v) {
          return /([0-9]{2})-([0-9]{3})/.test(v);
        },
        message: '{VALUE} is not a valid postcode!'
      },
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

const thisSchema = mongoose.model('Addresses', schema, 'Addresses');

module.exports = thisSchema;

module.exports.getOne = id => {
  return thisSchema
    .findById(id)
    .then(res => {
      if (!res) throw new customErrors.NotFound();
      return res;
    })
    .catch(err => {
      return err;
    });
};
module.exports.getList = args => {
  return thisSchema
    .find()
    .then(res => res)
    .catch(err => err);
};
module.exports.createNew = schema => {
  return new Promise((resolve, reject) => {
    var newAddress = new thisSchema(schema);

    newAddress
      .save()
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  })
    .then(res => res)
    .catch(err => err);
};
module.exports.updateId = (id, data) => {
  return new Promise((resolve, reject) => {
    thisSchema
      .findByIdAndUpdateAsync(id, data, { new: true })
      .then(res => {
        if (!res) throw new customErrors.NotFound();
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports.deleteId = id => {
  return new Promise((resolve, reject) => {
    thisSchema
      .findByIdAsync(id)
      .then(res => {
        if (!res) throw new customErrors.NotFound();
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
module.exports.count = query => {
  return thisSchema
    .find(query)
    .count({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
