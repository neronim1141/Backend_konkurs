var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AddressSchema = new Schema(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: 'Cities'
    },
    street: {
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
