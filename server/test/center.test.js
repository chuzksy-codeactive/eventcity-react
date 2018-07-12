import chaiHttp from 'chai-http';
import chai from 'chai';
import userSeeds from './seeds/user';
import centerSeeds from './seeds/center';

const models = require('../models');

process.env.NODE_ENV = 'test';
const server = require('../app');

const {
  expect
} = chai;
chai.use(chaiHttp);

let userId;
let userToken;
let centerId;
let createdCenter;

describe('Test for Center', () => {
  describe('====== Create centers test ======', () => {
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
    it('should return 400 if center name is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noCenterName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if center capacity is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noCapacity)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if center location is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noLocation)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if center facilities is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noLocation)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if center type is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noCenterType)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if center price is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.noPrice)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 409 if a center already exist', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          ...centerSeeds.center,
          name: 'Grailland Hall'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 201 if a center is created', (done) => {
      chai.request(server)
        .post('/api/v1/centers/test')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          createdCenter = res.body.data.id;
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('data').to.be.an('object');
          done();
        });
    });
    it('should return 200 when getting all centers', (done) => {
      chai.request(server)
        .get('/api/v1/centers')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data').to.be.an('array');
          done();
        });
    });
    it('should return 401 when no token is provided', (done) => {
      chai.request(server)
        .get('/api/v1/centers')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('====== Updates centers test ======', () => {
    it('should return 400 when a wrong parameter is passed for pagination', (done) => {
      chai.request(server)
        .get('/api/v1/centers/page/0ne')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 200 when there is no record', (done) => {
      chai.request(server)
        .get('/api/v1/centers')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data').to.be.an('array');
          done();
        });
    });
    it('should return 200 when an integer parameter is passed for pagination', (done) => {
      chai.request(server)
        .get('/api/v1/centers/page/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body).to.haveOwnProperty('count');
          expect(res.body).to.haveOwnProperty('pages');
          done();
        });
    });
    it('should return 404 when updating a center that does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/centers/test/120')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return 201 when updating a center that exist', (done) => {
      chai.request(server)
        .put('/api/v1/centers/test/1')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 401 if token is not provided', (done) => {
      chai.request(server)
        .put('/api/v1/centers/test/2')
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return return a message if params is missing', (done) => {
      chai.request(server)
        .put('/api/v1/centers/{}')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
  });
  describe('====== Delete centers test ======', () => {
    it('should return 404 for deleting centers that does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/centers/400')
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return 200 when a center is deleted', (done) => {
      chai.request(server)
        .delete(`/api/v1/centers/${createdCenter}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 401 when a user token is not provided', (done) => {
      chai.request(server)
        .delete(`/api/v1/centers/${createdCenter}`)
        .send(centerSeeds.center)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('====== Gets centers by Id ======', () => {
    it('should return 200 for getting center by Id', (done) => {
      chai.request(server)
        .get('/api/v1/centers/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return 404 for getting non existing center', (done) => {
      chai.request(server)
        .get('/api/v1/centers/500')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
  });
  describe('====== Get all events for a center test ======', () => {
    it('should return all booked events for a center', (done) => {
      chai.request(server)
        .get(`/api/v1/centers/event/${1}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('should return 404 on eventId is not provided', (done) => {
      chai.request(server)
        .get('/api/v1/centers/event/500')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
  });
});
