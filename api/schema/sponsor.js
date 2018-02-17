var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var SponsorSchema = new Schema(
  {
    name: {
      type: String
    },
    site: {
      type: String
    },
    image: {
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

const Sponsor = mongoose.model('Sponsors', SponsorSchema, 'Sponsors');

module.exports = Sponsor;
