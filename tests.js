const conn = require('./utility/db');

const sinon = require('sinon');
require('sinon-mongoose');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const tests = require('./api/models/index.spec');
const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};
describe('Test', () => {
  before(function(done) {
    conn
      .open()
      .then(() => {
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

  describe('Mongoose', () => {
    for (test in tests) {
      describe(tests[test].name, () => {
        if (tests[test].schema) tests[test].schema();
      });
    }
  });
  describe('GraphQL', () => {
    for (test in tests) {
      describe(tests[test].name, () => {
        if (tests[test].type) {
          tests[test].type();
        }
        if (tests[test].queries) {
          tests[test].queries();
        }
        if (tests[test].mutation) {
          tests[test].mutation();
        }
      });
    }
  });
  describe('GraphQl Mongoose Integration', () => {
    for (test in tests) {
      describe(tests[test].name, () => {
        if (tests[test].integration) {
          tests[test].integration();
        }
      });
    }
  });
});
