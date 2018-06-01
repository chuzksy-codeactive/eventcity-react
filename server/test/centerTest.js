const request = require('supertest');
const express = require('express');

const { expect } = require('chai');

const app = express();
const api = request('http://localhost:3000/api/v1/centers');
const token = 'eyJhbGciOiJIUzI1NiJ9.Y2h1emtzeQ.6lp4dX4jhB7TY55MIRchTDFl8ZUnr2MQCFQImbQefUA';

describe('GET /centers/', () => {});

describe('GET /centers', () => {
  it('respond with json', (done) => {
    api
      .get('/')
      .expect('Accept', 'application/json')
      .expect(200)
      .end(() => done());
  });
});

describe('GET /centers/centerId', () => {
  it('should return a 200 response', (done) => {
    api
      .get('/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(() => done());
  });
  it('should return a 403 response', (done) => {
    api
      .get('/1')
      .set('Accept', 'application/json')
      .expect(403)
      .end(() => done());
  });
});

describe('PUT /centers/centerId', () => {
  it('should return a 200 response', (done) => {
    api
      .put('/1')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Imole Hall',
        capacity: 2300,
        location: 'Ikoyi',
        facilities: 'Table, Chairs',
        type: 'Theatre'
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

describe('POST /centers/', () => {
  it('should return a 200 response', (done) => {
    api
      .post('/')
      .set('Accept', 'applicaton/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 440,
        centerName: 'Imole Mutipurpose Hall',
        capacity: '3000',
        location: 'Agege',
        facilities: 'Air Conditions, Deep Freezers, Generator',
        centerType: 'Banquet'
      })
      .expect(200)
      .end(() => done());
  });
});
