'use strict';
const mongoose = require('mongoose');

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const customErrors = require('../../../utility/errors');
const schema = require('./schema');
const mongooseErrors = mongoose.Error;

const modelName = 'application';
const fields = ['school', 'edition', 'classes', 'status'];
const required = ['school', 'edition', 'classes', 'status'];

const valid = {
  school: '',
  edition: '',
  classes: [],
  status: ''
};
const updated = {
  school: '',
  edition: '',
  classes: [],
  status: ''
};
const invalid = {
  school: '',
  edition: '',
  classes: [],
  status: ''
};
module.exports = () => {
  describe('schema', () => {
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

  describe('Methods', () => {
    let testObject;

    describe('createNew', () => {
      it('Should response with error', async () => {
        await schema.find().remove();

        const res = await schema.createNew();
        expect(res).to.be.instanceOf(mongooseErrors.ValidationError);
      });
      it(`Schould create new ${modelName}`, async () => {
        const res = await schema.createNew(valid);
        testObject = res;
        expect(testFields(res, valid, fields)).to.equal(true);
      });
    });
    describe('getOne', () => {
      it('Should response with not found error', async () => {
        const res = await schema.getOne();
        expect(res).to.be.instanceOf(customErrors.NotFound);
      });
      it(`Should return one ${modelName}`, async () => {
        const res = await schema.getOne(testObject.id);
        expect(testFields(res, testObject, fields)).to.equal(true);
      });
    });
    describe('getList', () => {
      it('Should return Array', async () => {
        const res = await schema.getList();
        expect(res).to.be.an('Array');
      });
      it(`Should response with created ${modelName}`, async () => {
        const res = await schema.getList();
        expect(testFields(res[0], testObject, fields)).to.equal(true);
      });
    });
  });
};

function testFields(tested, test, fields) {
  let valid = true;
  for (let f of fields) {
    if (tested[f] != test[f]) valid = false;
  }
  return valid;
}
