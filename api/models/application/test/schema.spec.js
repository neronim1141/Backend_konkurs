'use strict';
const mongoose = require('mongoose');

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const customErrors = require('../../../../utility/errors');
const schema = require('../schema');
const mongooseErrors = mongoose.Error;

const modelName = 'application';
const fields = ['school', 'edition', 'classes', 'status'];
const required = ['school', 'edition', 'classes', 'status'];

const valid = {
  school: '5a99ab53cbddac69287cfafa',
  edition: '5a99ab53cbddac69287cfafa',
  classes: ['5a99ab53cbddac69287cfafa'],
  status: 'a'
};
const updated = {
  school: 'a',
  edition: 'a',
  classes: ['a'],
  status: 'a'
};
const invalid = {
  school: 'a',
  edition: 'a',
  classes: ['a'],
  status: 'a'
};
module.exports = () => {
  describe('schema', () => {
    before(async () => {
      await schema.find().remove();
    });
    describe('required fields Errors', () => {
      let test = new schema(invalid);
      for (let req of required) {
        it(`${req} required`, () => {
          test.validate(err => {
            expect(err.errors[req]).to.exist;
            done();
          });
        });
      }
    });

    describe('required fields Valid', () => {
      let test = new schema(valid);
      for (let req of required) {
        it(`${req} required`, () => {
          test.validate(err => {
            expect(err.errors[req]).to.not.exist;
            done();
          });
        });
      }
    });
  });
};
