import models from '../models';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const Sequelize = require('sequelize');
const config = require('../secretConfig');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const { Op } = Sequelize;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.default.secret
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

passport.use(new LocalStrategy((username, password, done) => {
  models.User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }]
    }
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(user.password, password)) {
          return done(null, user);
        }
        return done(null, false);
      }
    })
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
}));
