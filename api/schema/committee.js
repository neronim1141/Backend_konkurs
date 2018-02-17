var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CommitteeSchema = new Schema(
  {
    group: {
      type: String
    },
    email: {
      type: String
    },
    www: {
      type: String
    },
    fax: {
      type: String
    },
    telephone: {
      type: String
    },
    regions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Regions'
      }
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Addresses'
    },
    chairman: {
      type: Schema.Types.ObjectId,
      ref: 'Persons'
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true
    }
  }
);
var autoPopulate = function(next) {
  this.populate('regions address chairman');
  next();
};
CommitteeSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const Committee = mongoose.model('Committees', CommitteeSchema, 'Committees');

module.exports = Committee;
