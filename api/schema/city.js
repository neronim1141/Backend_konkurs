var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CitySchema = new Schema(
  {
    commune: {
      type: Schema.Types.ObjectId,
      ref: 'Communes'
    },
    name: {
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

const City = mongoose.model('Cities', CitySchema, 'Cities');

module.exports = City;
