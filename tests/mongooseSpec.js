'use strict';
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const customErrors = require('../utility/errors');

module.exports = (factoryName, factory) => {
  before(() => {
    mongoose.SchemaTypes = {};
  });
  describe('schema', () => {
    describe('validation Error', () => {
      let test = new factory.schema(factory.invalid);
      for (let req of factory.required) {
        it(`${req} required`, () => {
          test.validate(err => {
            expect(err.errors[req]).to.exist;
            done();
          });
        });
      }
    });
    if (factory.additionalValidation && factory.additionalValidation.invalid)
      factory.additionalValidation.invalid();
    describe('validation Valid', () => {
      let test = new factory.schema(factory.valid);
      for (let req of factory.required) {
        it(`${req} required`, () => {
          test.validate(err => {
            expect(err.errors[req]).to.not.exist;
            done();
          });
        });
      }
    });
    if (factory.additionalValidation && factory.additionalValidation.valid)
      factory.additionalValidation.valid();
  });

  describe('Methods', () => {
    let testObject;

    describe('createNew', () => {
      it('Should response with error', async () => {
        await factory.schema.find().remove();

        const res = await factory.schema.createNew();
        expect(res).to.be.instanceOf(ValidationError);
      });
      it(`Schould create new ${factoryName}`, async () => {
        const res = await factory.schema.createNew(factory.valid);
        testObject = res;
        expect(testFields(res, factory.valid, factory.fields)).to.equal(true);
      });
    });
    describe('getOne', () => {
      it('Should response with not found error', async () => {
        const res = await factory.schema.getOne();
        expect(res).to.be.instanceOf(customErrors.NotFound);
      });
      it(`Should return one ${factoryName}`, async () => {
        const res = await factory.schema.getOne(testObject.id);
        expect(testFields(res, testObject, factory.fields)).to.equal(true);
      });
    });
    describe('getList', () => {
      it('Should return Array', async () => {
        const res = await factory.schema.getList();
        expect(res).to.be.an('Array');
      });
      it(`Should response with created ${factoryName}`, async () => {
        const res = await factory.schema.getList();
        expect(testFields(res[0], testObject, factory.fields)).to.equal(true);
      });
    });
  });
  if (factory.additionalMethods && factory.additionalMethods)
    factory.additionalMethods();
};

function testFields(tested, test, fields) {
  let valid = true;
  for (let f of fields) {
    if (tested[f] != test[f]) valid = false;
  }
  return valid;
}
