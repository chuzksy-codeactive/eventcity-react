import chaiHttp from 'chai-http';
import chai from 'chai';
import userSeeds from './seeds/user';

const models = require('../models');

process.env.NODE_ENV = 'test';
const server = require('../app');

const {
  expect
} = chai;
chai.use(chaiHttp);

describe('Test for Users', () => {
  describe('Users signup test', () => {
    it('should return 201 on user signup', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('message').to.be.a('string');
          expect(res.body).to.haveOwnProperty('data').to.be.an('object');
          expect(res.body).to.haveOwnProperty('token').to.be.a('string');
          done();
        });
    });
    it('should return 400 if username is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.noUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if firstname is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.noFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if lastname is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.noLastname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if email is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 400 if password is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
    it('should return 409 if username is already taken', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.user)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('message').to.equal('Username is already taken');
          done();
        });
    });
    it('should return 409 if email is already taken', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.userWithSameEmail)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('message').to.equal('Email is already taken');
          done();
        });
    });
    it('should return 400 if username is less than 6 characters', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(userSeeds.userWithShortUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
  });
  describe('User signin test', () => {
    it('should return 202 when the user logs in', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          username: userSeeds.user.username,
          password: userSeeds.user.password
        })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body).to.haveOwnProperty('token').not.to.be.a('null');
          expect(res.body).to.haveOwnProperty('data').to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('Logged in successfully');
          done();
        });
    });
    it('should return 401 when wrong password is supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          username: 'chuzksy',
          password: 'passwrod'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message').to.equal('Wrong password');
          done();
        });
    });
    it('should return 404 when wrong username is supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          username: 'chuzksy101',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message').to.equal('You have no login details with us. Kindly sign up with us');
          done();
        });
    });
    it('should return 400 when no credentials', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          username: userSeeds.noUsername.username,
          password: userSeeds.noUsername.password
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.be.an('array');
          done();
        });
    });
  });
  describe('Test for pagination', () => {
    it('should return 200 when an integer parameter is passed for pagination', (done) => {
      chai.request(server)
        .get('/api/v1/users/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          expect(res.body).to.haveOwnProperty('count');
          expect(res.body).to.haveOwnProperty('pages');
          done();
        });
    });
    it('should return 400 when a wrong parameter is passed for pagination', (done) => {
      chai.request(server)
        .get('/api/v1/users/0ne')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
  });
  describe('Test to fetch all users', () => {
    it('should return 200 when users are fetched', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('data');
          done();
        });
    });
  });
});
