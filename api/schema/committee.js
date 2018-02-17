var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CommitteeSchema = new Schema(
  {
    region: {
      type: String
    },
    adress: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses'
    },
    moderator: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);

const Committee = mongoose.model('Committees', CommitteeSchema, 'Committees');

module.exports = Committee;
