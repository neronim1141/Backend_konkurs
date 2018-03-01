const conn = require('./../utility/db');

const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const factories = require('./factories');
const mongoTest = require('./mongooseSpec');
const graphTest = require('./graphQLSpec');
const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};
describe('Mongoose', () => {
  before(function(done) {
    conn
      .open()
      .then(() => {
        for (factory in factories) {
          if (factories[factory].mongoose)
            factories[factory].mongoose.schema.find().remove();
        }

        done();
      })
      .catch(done);
  });

  after(function(done) {
    conn
      .close()
      .then(() => done())
      .catch(done);
  });
  for (factory in factories) {
    describe(factories[factory].name, () => {
      if (factories[factory].mongoose)
        mongoTest(factories[factory].name, factories[factory].mongoose);
    });
  }
});
describe('GraphQL', () => {
  for (factory in factories) {
    if (factories[factory].GraphQL)
      graphTest(factories[factory].name, factories[factory].GraphQL);
  }
});
