'use strict';

const mongoose = require('mongoose');

const graphql = require('graphql');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const expect = chai.expect;

module.exports = (factoryName, factory) => {
  describe(factoryName, () => {
    describe('Type', () => {
      describe('Fields', () => {
        for (let field in factory.fieldsType) {
          it(`Should have an ${field} field of type ${
            factory.fieldsType[field].name
          }`, () => {
            expect(factory.type.getFields()).to.have.property(field);
            expect(factory.type.getFields()[field].type).to.deep.equals(
              factory.fieldsType[field]
            );
          });
        }
      });
    });
    if (factory.queriesTest) factory.queriesTest(factory);
  });
};
