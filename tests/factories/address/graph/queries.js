const queries = require('../../../../api/graphql/address/queries');
const chai = require('chai');
const expect = chai.expect;
const graphql = require('graphql');

module.exports = factory => {
  describe('Query', () => {
    describe('Address', () => {
      describe('Fields', () => {
        it(`Should have a Type: ${factory.type}`, () => {
          expect(queries.address.type).to.deep.equals(factory.type);
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
