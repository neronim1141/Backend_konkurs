var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AplicationSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: 'Schools'
    },
    edition: {
      type: Schema.Types.ObjectId,
      ref: 'Editions'
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Classes'
      }
    ],
    status: {
      type: String
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
  this.populate('school edition classes');
  next();
};
AplicationSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const Aplication = mongoose.model(
  'Applications',
  AplicationSchema,
  'Applications'
);

module.exports = Aplication;
