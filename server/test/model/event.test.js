import chai from 'chai';
import models from '../../models';
import eventSeeds from '../seeds/event';

const { Event } = models;
const { expect } = chai;

describe('Event models', () => {
  it('should not create event if name is not available', (done) => {
    Event.create(eventSeeds.noName)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Event.name cannot be null');
        done();
      });
  });
  it('should not create event if purpose is not available', (done) => {
    Event.create(eventSeeds.noPurpose)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Event.purpose cannot be null');
        done();
      });
  });
  it('should not create event if note is not available', (done) => {
    Event.create(eventSeeds.noNote)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Event.note cannot be null');
        done();
      });
  });
  it('should not create event if eventDate is not available', (done) => {
    Event.create(eventSeeds.noEventDate)
      .catch((err) => {
        expect(err.errors).to.be.an('array');
        expect(err.errors[0]).to.haveOwnProperty('message');
        expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Event.eventDate cannot be null');
        done();
      });
  });
});
