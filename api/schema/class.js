var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ClassSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: 'Schools'
    },
    guardian: {
      type: Schema.Types.ObjectId,
      ref: 'Persons'
    },
    language: {
      type: String
    },
    code: {
      type: String
    },
    year: {
      type: String
    },
    result: {
      type: Number
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
  this.populate('school guardian');
  next();
};
ClassSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const Class = mongoose.model('Classes', ClassSchema, 'Classes');

module.exports = Class;
