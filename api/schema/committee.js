var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    group: {
      type: String
    },
    email: {
      type: String
    },
    www: {
      type: String
    },
    fax: {
      type: String
    },
    telephone: {
      type: String
    },
    regions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Regions'
      }
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses'
    },
    chairman: {
      type: Schema.Types.ObjectId,
      ref: 'Persons'
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);
var autoPopulate = function(next) {
  this.populate('regions address chairman');
  next();
};
schema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const thisSchema = mongoose.model('Committees', schema, 'Committees');

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
