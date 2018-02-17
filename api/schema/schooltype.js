var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SchoolTypeSchema = new Schema(
  {
    type: {
      type: String
    },
    group: {
      type: String,
      enum: ['JUNIOR', 'SENIOR']
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const SchoolType = mongoose.model(
  'SchoolTypes',
  SchoolTypeSchema,
  'SchoolTypes'
);

module.exports = SchoolType;
