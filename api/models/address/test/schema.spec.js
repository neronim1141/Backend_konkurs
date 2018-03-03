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

const modelName = 'address';
const fields = ['name', 'street', 'postcode', 'city'];
const required = ['name', 'street', 'postcode', 'city'];

const valid = {
  name: 'a',
  street: 'a',
  postcode: '86-300',
  city: 'a'
};
const updated = {
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
const invalid = {
  id: '',
  name: '',
  street: '',
  postcode: '',
  city: ''
};
const partialInvalid = {
  name: 'a',
  street: 'a',
  postcode: '67777',
  city: 'a'
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
    describe('regex validate', () => {
      let test = new schema(partialInvalid);
      it(`postcode format`, () => {
        test.validate(err => {
          expect(err.errors['postcode']).to.exist;
          done();
        });
      });
    });
  });

  describe('Methods', () => {
    let testObject;

    describe('createNew', () => {
      it('Should response with error', async () => {
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
    describe('count', () => {
      it('Should return document count', async () => {
        const res = await schema.count();
        expect(res).to.be.equal(1);
      });
      it('Should return an integer', async () => {
        const res = await schema.count();
        expect(res).to.be.an('Number');
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
