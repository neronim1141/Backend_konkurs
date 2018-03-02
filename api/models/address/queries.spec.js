const chai = require('chai');
const expect = chai.expect;
const graphql = require('graphql');

const type = require('./type');
const queries = require('./queries');

module.exports = () => {
  describe('Query', () => {
    describe('Address', () => {
      describe('Fields', () => {
        it(`Should have a Type: ${type}`, () => {
          expect(queries.address.type).to.deep.equals(type);
        });
        it('Should have a args id with non null type String', () => {
          expect(queries.address.args.id.type).to.deep.equals(
            graphql.GraphQLNonNull(graphql.GraphQLString)
          );
        });
      });
      describe('resolve', () => {});
    });
  });
};
