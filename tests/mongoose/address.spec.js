'use strict';
const mongoose = require('mongoose');

const ValidationError = mongoose.Error.ValidationError;
const conn = require('../../utility/db');

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const addressSchema = require('../../api/schema/address');
const customErrors = require('../../utility/errors');

let addressGood = {
  id: '5a888b94c7263412e48c0e22',
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
let addressUpdated = {
  id: '5a888b94c7263412e48c0e22',
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
let addressInvalid = {
  id: '',
  name: '',
  street: '',
  postcode: '',
  city: ''
};
let addressPartialInvalid = {
  id: '5a888b94c7263412e48c0e22',
  name: '',
  street: '',
  postcode: '',
  city: ''
};
describe('Mongoose: Address', () => {
  before(function(done) {
    conn
      .open()
      .then(() => done())
      .catch(done);
  });

  after(function(done) {
    conn
      .close()
      .then(() => done())
      .catch(done);
  });
  describe('schema', () => {
    describe('validation Error', () => {
      let address = new addressSchema(addressInvalid);
      it('name required', () => {
        address.validate(err => {
          expect(err.errors.name).to.exist;
          done();
        });
      });
      it('street required', () => {
        address.validate(err => {
          expect(err.errors.street).to.exist;
          done();
        });
      });
      it('postcode required', () => {
        address.validate(err => {
          expect(err.errors.postcode).to.exist;
          done();
        });
      });
      it('city required', () => {
        address.validate(err => {
          expect(err.errors.city).to.exist;
          done();
        });
      });
    });
    describe('validation Valid', () => {
      let address = new addressSchema(addressGood);
      it('name required', () => {
        address.validate(err => {
          expect(err.errors.name).to.not.exist;
          done();
        });
      }),
        it('street required', () => {
          address.validate(err => {
            expect(err.errors.street).to.not.exist;
            done();
          });
        });
      it('postcode required', () => {
        address.validate(err => {
          expect(err.errors.postcode).to.not.exist;
          done();
        });
      });
      it('city required', () => {
        address.validate(err => {
          expect(err.errors.city).to.not.exist;
          done();
        });
      });
    });
  });

  describe('Methods', () => {
    let address;

    describe('createNew', () => {
      it('Should response with error', async () => {
        await addressSchema.find().remove();

        const res = await addressSchema.createNew();
        expect(res).to.be.instanceOf(ValidationError);
      });
      it('Schould create new address', async () => {
        const res = await addressSchema.createNew(addressGood);
        address = res;
        let test =
          res.name == addressGood.name &&
          res.street == addressGood.street &&
          res.postcode == addressGood.postcode &&
          res.city == addressGood.city;
        expect(test).to.equal(true);
      });
    });
    describe('getOne', () => {
      it('Should response with not found error', async () => {
        const res = await addressSchema.getOne();
        expect(res).to.be.instanceOf(customErrors.NotFound);
      });
      it('Should return one address', async () => {
        const res = await addressSchema.getOne(address.id);
        let test =
          res.name == address.name &&
          res.street == address.street &&
          res.postcode == address.postcode &&
          res.city == address.city;
        expect(test).to.equal(true);
      });
    });
    describe('getList', () => {
      it('Should return Array', async () => {
        const res = await addressSchema.getList();

        expect(res).to.be.an('Array');
      });
      it('Should response with created address', async () => {
        const res = await addressSchema.getList();
        let test =
          res[0].name == address.name &&
          res[0].street == address.street &&
          res[0].postcode == address.postcode &&
          res[0].city == address.city;
        expect(test).to.equal(true);
      });
    });
  });
});
