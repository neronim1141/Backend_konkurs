var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    address: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses',
      required: true
    },
    schoolType: {
      type: Schema.Types.ObjectId,
      ref: 'SchoolTypes',
      required: true
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: 'Persons',
      required: true
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: 'Provinces',
      required: true
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Regions',
      required: true
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Classes'
      }
    ],
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Applications'
      }
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Persons'
      }
    ],
    patron: { type: String },
    email: {
      type: String,
      required: true
    },
    telephone: { type: String },
    fax: { type: String },
    creationTime: {
      type: Date,
      default: Date.now,
      required: true
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
  this.populate(
    'address schoolType director province region classes applications teachers'
  );
  next();
};
schema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const thisSchema = mongoose.model('Schools', schema, 'Schools');

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
