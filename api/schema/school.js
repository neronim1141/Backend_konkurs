var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var SchoolSchema = new Schema(
  {
    adress: {
      type: Schema.Types.ObjectId,
      ref: "Addresses"
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: "Persons"
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: "Provinces"
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: "Regions"
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Classes"
      }
    ],
    apllications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Aplications"
      }
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Persons"
      }
    ],
    email: { type: String },
    patron: { type: String },
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

const School = mongoose.model("Schools", SchoolSchema, "Schools");

module.exports = School;
