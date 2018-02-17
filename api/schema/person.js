var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PersonSchema = new Schema(
  {
    name: {
      type: String
    },
    lastName: {
      type: String
    },
    title: {
      type: String
    },
    email: {
      type: String
    },
    telephone: {
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

const Person = mongoose.model('Persons', PersonSchema, 'Persons');

module.exports = Person;
