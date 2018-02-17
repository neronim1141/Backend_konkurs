var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var EditionSchema = new Schema(
  {
    name: {
      type: String
    },
    sign_from: {
      type: Date
    },
    sign_to: {
      type: Date
    },
    results_from: {
      type: Date
    },
    results_from: {
      type: Date
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const Edition = mongoose.model('Editions', EditionSchema, 'Editions');

module.exports = Edition;
