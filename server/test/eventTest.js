const request = require('supertest');
const express = require('express');

const expect = require('chai').expect;

const app = express();
const api = request('http://localhost:3000/api/v1/events');
const token = 'eyJhbGciOiJIUzI1NiJ9.Y2h1emtzeQ.6lp4dX4jhB7TY55MIRchTDFl8ZUnr2MQCFQImbQefUA';

describe('POST /events/', () => {
  it('should return a 200 response', (done) => {
    api
      .post('/')
      .set('Accept', 'applicaton/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Obas Birthday',
        purpose: '50th birthday',
        note: 'We invite you to the 50th birthday of Oba of Ile Ife, Come with your friends',
        eventDate: '2017-12-21',
        userId: 1,
        centerId: 1
      })
      .expect(200)
      .end(() => done());
  });
});

describe('PUT /centers/centerId', () => {
  it('should return a 200 response', (done) => {
    api
      .put('/11')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Andela Meetup',
        purpose: 'Training',
        note: 'This meetup is the motivated youth to learn how to program',
        eventDate: '2018-12-12',
        userId: 1,
        centerId: 1
      })
      .expect(200)
      .end(() => {
        done();
      });
  });
  it('should return a 404 not found', (done) => {
    api
      .put('/999')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(404)
      .end((err, res) => {
        done();
      });
  });
});

