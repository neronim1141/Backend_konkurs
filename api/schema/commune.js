var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CommuneSchema = new Schema(
  {
    region: {
      type: Schema.Types.ObjectId,
      ref: 'Regions'
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

const Commune = mongoose.model('Communes', CommuneSchema, 'Communes');

module.exports = Commune;
