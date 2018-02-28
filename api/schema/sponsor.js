var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SponsorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    site: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const Sponsor = mongoose.model('Sponsors', SponsorSchema, 'Sponsors');

module.exports = Sponsor;
