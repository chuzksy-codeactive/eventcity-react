import chai from 'chai';
import models from '../../models';
import centerSeeds from '../seeds/center';

const { Center } = models;
const { expect } = chai;

describe('Center models', () => {
  it('should not create center if name is not available', (done) => {
    Center.create(centerSeeds.noCenterName)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.name cannot be null');
        done();
      });
  });
  it('should not create center if capacity is not available', (done) => {
    Center.create(centerSeeds.noCapacity)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.capacity cannot be null');
        done();
      });
  });
  it('should not create center if location is not available', (done) => {
    Center.create(centerSeeds.noLocation)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.location cannot be null');
        done();
      });
  });
  it('should not create center if price is not available', (done) => {
    Center.create(centerSeeds.noPrice)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.price cannot be null');
        done();
      });
  });
  it('should not create center if facilities is not available', (done) => {
    Center.create(centerSeeds.noFacilities)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.facilities cannot be null');
        done();
      });
  });
  it('should not create center if facilities is not available', (done) => {
    Center.create(centerSeeds.noCenterType)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Center.type cannot be null');
        done();
      });
  });
  it('should create a valid user', (done) => {
    Center.create(centerSeeds.center)
      .then((center) => {
        expect(center).to.be.an('object');
        expect(center.id).to.be.a('number');
        expect(center.name).to.be.a('string');
        expect(center.capacity).to.be.a('number');
        expect(center.location).to.be.a('string');
        expect(center.type).to.be.a('string');
        done();
      });
  });
  it('should find a valid user', (done) => {
    Center.findById(1)
      .then((center) => {
        expect(center).to.haveOwnProperty('dataValues');
        expect(center.dataValues).to.be.an('object');
        done();
      });
  });
  after(() => {
    Center.destroy({
      where: {}
    });
  });
});
