'use strict';
const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;
const client = {};
const addressType = require('../../api/types/address');
const addressQueries = require('../../api/graphql/address/queries');
const addressSchema = require('../../api/schema/address');

let address1 = {
  id: 'a',
  name: 'a',
  street: 'a',
  postcode: 'a',
  city: 'a'
};
let address2 = {
  id: 'b',
  name: 'b',
  street: 'b',
  postcode: 'b',
  city: 'b'
};

describe('GraphQL: Address', () => {
  describe('Type', () => {
    describe('Fields', () => {
      it('Should have an id field of type String', () => {
        expect(addressType.getFields()).to.have.property('id');
        expect(addressType.getFields().id.type).to.deep.equals(
          graphql.GraphQLID
        );
      });

      it('Should have a name field of type String', () => {
        expect(addressType.getFields()).to.have.property('name');
        expect(addressType.getFields().name.type).to.deep.equals(
          graphql.GraphQLString
        );
      });

      it('Should have a street field of type String', () => {
        expect(addressType.getFields()).to.have.property('street');
        expect(addressType.getFields().street.type).to.deep.equals(
          graphql.GraphQLString
        );
      });

      it('Should have a postcode field of type String', () => {
        expect(addressType.getFields()).to.have.property('postcode');
        expect(addressType.getFields().postcode.type).to.deep.equals(
          graphql.GraphQLString
        );
      });

      it('Should have a city field of type String', () => {
        expect(addressType.getFields()).to.have.property('city');
        expect(addressType.getFields().city.type).to.deep.equals(
          graphql.GraphQLString
        );
      });
    });
  });
  describe('Query', () => {
    beforeEach(function() {
      sandbox.stub(addressSchema, 'find');
    });
    afterEach(function() {
      sandbox.restore();
    });
    describe('Address', () => {
      describe('Fields', () => {
        it('Should have a Type: addressType', () => {
          expect(addressQueries.address.type).to.deep.equals(addressType);
        });
        it('Should have a args id with non null type String', () => {
          expect(addressQueries.address.args.id.type).to.deep.equals(
            graphql.GraphQLNonNull(graphql.GraphQLString)
          );
        });
      });
      describe('resolve', () => {});
    });
  });
});
