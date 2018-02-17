var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var AplicationSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "Schools"
    },
    edition: {
      type: Schema.Types.ObjectId,
      ref: "Editions"
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Classes"
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

const Aplication = mongoose.model(
  "Aplicationes",
  AplicationSchema,
  "Aplicationses"
);

module.exports = Aplication;
