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
  });
};

// describe('GraphQL: Address', () => {
//   describe('Type', () => {
//     describe('Fields', () => {
//       it('Should have an id field of type String', () => {
//         expect(addressType.getFields()).to.have.property('id');
//         expect(addressType.getFields().id.type).to.deep.equals(
//           graphql.GraphQLID
//         );
//       });

//       it('Should have a name field of type String', () => {
//         expect(addressType.getFields()).to.have.property('name');
//         expect(addressType.getFields().name.type).to.deep.equals(
//           graphql.GraphQLString
//         );
//       });

//       it('Should have a street field of type String', () => {
//         expect(addressType.getFields()).to.have.property('street');
//         expect(addressType.getFields().street.type).to.deep.equals(
//           graphql.GraphQLString
//         );
//       });

//       it('Should have a postcode field of type String', () => {
//         expect(addressType.getFields()).to.have.property('postcode');
//         expect(addressType.getFields().postcode.type).to.deep.equals(
//           graphql.GraphQLString
//         );
//       });

//       it('Should have a city field of type String', () => {
//         expect(addressType.getFields()).to.have.property('city');
//         expect(addressType.getFields().city.type).to.deep.equals(
//           graphql.GraphQLString
//         );
//       });
//     });
//   });
//   describe('Query', () => {
//     describe('Address', () => {
//       describe('Fields', () => {
//         it('Should have a Type: addressType', () => {
//           expect(addressQueries.address.type).to.deep.equals(addressType);
//         });
//         it('Should have a args id with non null type String', () => {
//           expect(addressQueries.address.args.id.type).to.deep.equals(
//             graphql.GraphQLNonNull(graphql.GraphQLString)
//           );
//         });
//       });
//       describe('resolve', () => {});
//     });
//   });
// });
