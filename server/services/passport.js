import models from '../models';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const Sequelize = require('sequelize');

const config = process.env.Key;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const { Op } = Sequelize;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config
};
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  models.User.findById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
}));

