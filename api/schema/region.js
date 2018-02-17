var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RegionSchema = new Schema(
  {
    province: {
      type: Schema.Types.ObjectId,
      ref: 'Provinces'
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

var autoPopulate = function(next) {
  this.populate('province');
  next();
};
RegionSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

const Region = mongoose.model('Regions', RegionSchema, 'Regions');

module.exports = Region;
