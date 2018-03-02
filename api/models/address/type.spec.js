'use strict';

const mongoose = require('mongoose');

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;

const type = require('./type');

const fieldsType = {
  id: graphql.GraphQLID,
  name: graphql.GraphQLString,
  street: graphql.GraphQLString,
  postcode: graphql.GraphQLString,
  city: graphql.GraphQLString
};

module.exports = () => {
  describe('Type', () => {
    describe('Fields', () => {
      for (let field in fieldsType) {
        it(`Should have an ${field} field of type ${
          fieldsType[field].name
        }`, () => {
          expect(type.getFields()).to.have.property(field);
          expect(type.getFields()[field].type).to.deep.equals(
            fieldsType[field]
          );
        });
      }
    });
  });
};
