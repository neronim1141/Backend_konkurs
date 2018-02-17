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

const Region = mongoose.model('Regions', RegionSchema, 'Regions');

module.exports = Region;
