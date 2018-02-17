var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var SchooltypeSchema = new Schema(
  {
    type: {
      type: String
    },
    group: {
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

const Schooltype = mongoose.model(
  "Schooltypes",
  SchooltypeSchema,
  "Schooltypes"
);

module.exports = Address;
