var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var customErrors = require('../../utility/errors');
var Sponsor = require('./sponsor');
var Schema = mongoose.Schema;

var AddressSchema = new Schema(
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
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true,
      transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toJSON: {
      virtuals: true,
      transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Address = mongoose.model('Addresses', AddressSchema, 'Addresses');

module.exports = Address;

module.exports.getOne = id => {
  return Address.findById(id)
    .then(res => {
      if (!res) throw new customErrors.NotFound();
      return res;
    })
    .catch(err => {
      return err;
    });
};
module.exports.getList = args => {
  return Address.find()
    .then(res => res)
    .catch(err => err);
};
module.exports.createNew = schema => {
  return new Promise((resolve, reject) => {
    var newAddress = new Address(schema);

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
    Address.findByIdAndUpdateAsync(id, data, { new: true })
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
    Address.findByIdAsync(id)
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
