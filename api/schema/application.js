var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AddressSchema = new Schema(
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

const Address = mongoose.model('Addresses', AddressSchema, 'Addressses');

module.exports = Address;
