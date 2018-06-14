import chaiHttp from 'chai-http';
import chai from 'chai';
import userSeeds from './seeds/user';
import centerSeeds from './seeds/center';
import eventSeeds from './seeds/event';

const models = require('../models');

process.env.NODE_ENV = 'test';
const server = require('../app');

const {
  expect
} = chai;
chai.use(chaiHttp);

let userToken;
let userId;
let centerId;
let eventId;

describe('Test for Events', () => {
  describe('====== Create events test ======', () => {
    it('should return 202 when the user logs in', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          username: 'chuzksy',
          password: 'password'
        })
        .end((err, res) => {
          userId = res.body.data.id;
          userToken = res.body.token;
          expect(res.status).to.equal(202);
          expect(res.body).to.haveOwnProperty('token').not.to.be.a('null');
          expect(res.body).to.haveOwnProperty('data').to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('Logged in successfully');
          done();
        });
    });
    it('should get center by Id', (done) => {
      chai.request(server)
        .get('/api/v1/centers/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          centerId = res.body.data.id;
          done();
        });
    });
    it('should get event by Id', (done) => {
      chai.request(server)
        .get('/api/v1/events/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          eventId = res.body.data.id;
          done();
        });
    });
    it('should return 400 if event name is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if event purpose is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noPurpose)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if event notes is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noNote)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if event date is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noEventDate)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if event userIds is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noUserId)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if event centerId is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.noCenterId)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 409 for an already booked event', (done) => {
      chai.request(server)
        .post('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          ...eventSeeds.eventWithSameDate,
          userId,
          centerId
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
  });
  describe('====== Get events test ======', () => {
    it('should get all booked event and return 200', (done) => {
      chai.request(server)
        .get('/api/v1/events')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
    it('should return 404 for event not found', (done) => {
      chai.request(server)
        .get('/api/v1/events/22')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should paginate and return 200', (done) => {
      chai.request(server)
        .get('/api/v1/events/page/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body).to.haveOwnProperty('count');
          expect(res.body).to.haveOwnProperty('pages');
          done();
        });
    });
    it('should return 400 when wrong param is passed for pagination', (done) => {
      chai.request(server)
        .get('/api/v1/events/page/o22')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 401 when token is not passed', (done) => {
      chai.request(server)
        .get('/api/v1/events')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('====== Update event test ======', () => {
    it('should return 404 for unavailable events', (done) => {
      chai.request(server)
        .put('/api/v1/events/120')
        .set('Authorization', `Bearer ${userToken}`)
        .send(eventSeeds.event)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 200 for booked event with different dates', (done) => {
      chai.request(server)
        .put(`/api/v1/events/${eventId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          ...eventSeeds.eventToUpdate,
          userId,
          centerId
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 401 when token is not passed', (done) => {
      chai.request(server)
        .put(`/api/v1/events/${eventId}`)
        .send(eventSeeds.event)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
