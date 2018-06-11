const request = require('supertest');
const express = require('express');

const { expect } = require('chai');

const api = request('http://localhost:3000/api/v1/users');

describe('POST /user/', () => {
  it('should return a 200 response', (done) => {
    api
      .post('/login')
      .set('Accept', 'applicaton/x-www-form-urlencoded')
      .send({
        username: 'chuzksy',
        password: 'password'
      })
      .expect(200)
      .end(() => done());
  });
});

describe('POST /user/', () => {
  it('should return a 200 response', (done) => {
    api
      .post('/')
      .set('Accept', 'applicaton/x-www-form-urlencoded')
      .send({
        username: 'chuzksy',
        firstname: 'ifeanyi',
        lastname: 'okwarazoro',
        emial: 'iffy2gen2@gmail.com',
        password: 'password'
      })
      .expect(200)
      .end(() => done());
  });
});
