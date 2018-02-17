var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProvinceSchema = new Schema(
  {
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

const Province = mongoose.model('Provinces', ProvinceSchema, 'Provinces');

module.exports = Province;
