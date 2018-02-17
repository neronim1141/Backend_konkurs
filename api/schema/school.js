var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SchoolSchema = new Schema(
  {
    adress: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses'
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person'
      }
    ],
    email: { type: String },
    telephone: { type: String },
    fax: { type: String }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const School = mongoose.model('Schools', SchoolSchema, 'Schools');

module.exports = School;
