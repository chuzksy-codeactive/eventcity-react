import chai from 'chai';
import models from '../../models';
import userSeeds from '../seeds/user';

const { User } = models;
const { expect } = chai;

describe.only('User models', () => {
  it('should not create user if firstname is not available', (done) => {
    User.create(userSeeds.noFirstname)
      .catch((err) => {
        console.log(err);
        // expect(err.errors).to.be.an('array');
        // expect(err.errors[0]).to.haveOwnProperty('message');
        // expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on firstname failed');
        done();
      });
  });
  // it('should not create user if username is not available', (done) => {
  //   User.create(userSeeds.noUsername)
  //     .catch((err) => {
  //       expect(err.errors).to.be.an('array');
  //       expect(err.errors[0]).to.haveOwnProperty('message');
  //       //expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on username failed');
  //       done();
  //     });
  // });
  // it('should not create user if lastname is not available', (done) => {
  //   User.create(userSeeds.noLastname)
  //     .catch((err) => {
  //       expect(err.errors).to.be.an('array');
  //       expect(err.errors[0]).to.haveOwnProperty('message');
  //       //expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on lastname failed');
  //       done();
  //     });
  // });
  // it('should not create user if username is not available', (done) => {
  //   User.create(userSeeds.noUsername)
  //     .catch((err) => {
  //       expect(err.errors).to.be.an('array');
  //       expect(err.errors[0]).to.haveOwnProperty('message');
  //       expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on username failed');
  //       done();
  //     });
  // });
  // it('should not create user if password is not available', (done) => {
  //   User.create(userSeeds.noPassword)
  //     .catch((err) => {
  //       expect(err.errors).to.be.an('array');
  //       expect(err.errors[0]).to.haveOwnProperty('message');
  //       expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on password failed');
  //       done();
  //     });
  // });
  // it('should not create user if email is not available', (done) => {
  //   User.create(userSeeds.noEmail)
  //     .catch((err) => {
  //       expect(err.errors).to.be.an('array');
  //       expect(err.errors[0]).to.haveOwnProperty('message');
  //       expect(err.errors[0]).to.haveOwnProperty('message').to.equal('Validation notEmpty on email failed');
  //       done();
  //     });
  // });
  // it('should create a valid user', (done) => {
  //   User.create(userSeeds.user)
  //     .then((newUser) => {
  //       expect(newUser).to.be.an('object');
  //       expect(newUser.id).to.be.a('number');
  //       expect(newUser.username).to.be.a('string');
  //       expect(newUser.lastname).to.be.a('string');
  //       expect(newUser.firstname).to.be.a('string');
  //       expect(newUser.password).to.be.a('string');
  //       expect(newUser.email).to.be.a('string');
  //       done();
  //     });
  // });
  // it('should find a valid user', (done) => {
  //   User.findById(1)
  //     .then((newUser) => {
  //       expect(newUser).to.haveOwnProperty('dataValues');
  //       expect(newUser.dataValues).to.be.an('object');
  //       done();
  //     });
  // });
  // it('should update a valid user', (done) => {
  //   User.update(userSeeds.userToUpdate, {
  //     where: {
  //       id: 1
  //     }
  //   })
  //     .then((user) => {
  //       expect(user).to.be.an('array');
  //       expect(user[0]).to.equal(1);
  //       done();
  //     });
  // });
  // after(() => {
  //   User.destroy({
  //     where: {}
  //   });
  // });
});
