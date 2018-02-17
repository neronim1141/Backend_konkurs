var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var AddressSchema = new Schema(
  {
    name: {
      type: String
    },
    street: {
      type: String
    },
    postcode: {
      type: String
    },
    city: {
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

const Address = mongoose.model("Addresses", AddressSchema, "Addressses");

module.exports = Address;
