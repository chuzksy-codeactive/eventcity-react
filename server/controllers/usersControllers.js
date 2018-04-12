import models from '../models';
import config from '../secretConfig';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtSimple = require('jwt-simple');

const Sequelize = require('sequelize');

// const Op = Sequelize.Op;
const { Op } = Sequelize;

const tokenFromUser = (user) => {
  const timeStamp = new Date().getTime();
  return jwtSimple.encode({ sub: user.id, iat: timeStamp }, config.secret);
};

const getAllUsers = (req, res) => {
  models.User.findAll().then((users) => {
    if (!users) {
      return res.json({
        errorMsg: 'No user found in the database',
        code: 200
      });
    }
    return res.json({
      data: users
    });
  });
};

const createUser = (req, res) => {
  let imageName = null;
  let imageUrl = null;
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username must be between 6-25 character long').len(6, 25);
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Invalid email address').isEmail();
  req.checkBody('password', 'Password field must not be empty').notEmpty();
  req.checkBody('password', 'Password must be between 8-100 character long').len(8, 100);
  req.checkBody('firstname', 'firstname is required').notEmpty();
  req.checkBody('lastname', 'lastname is required').notEmpty();

  req.sanitize('username').trim();
  req.sanitize('email').trim();

  if (req.file) {
    imageUrl = req.file.path;
    imageName = req.file.originalname;
    console.log(`Original Image name: ${imageName}`);
    console.log(`Original Image Url: ${imageUrl}`);
  } else {
    imageName = 'no_image.png';
    imageUrl = 'no_image_url';
  }

  let errors = [];

  const hashPassword = bcrypt.hashSync(req.body.password);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      return res.status(200).json({
        errorMsg: errors
      });
    }
    models.User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
      }
    }).then((user) => {
      if (user) {
        if (user.username === req.body.username) {
          return res.status(200).json({
            error: {
              username: 'Username is already taken'
            }
          });
        } else if (user.email === req.body.email) {
          return res.status(200).json({
            error: {
              email: 'Email is already taken'
            }
          });
        }
      } else {
        models.User.create({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: hashPassword,
          email: req.body.email,
          imageUrl,
          imageName
        }).then((u) => {
          if (u) {
            return res.status(200).json({
              code: 201,
              userMsg: 'New user has been created successfully',
              data: u,
              token: tokenFromUser(u)
            });
          }
          return res.status(500).json({
            code: 500,
            userMsg: 'There is an internal server error'
          });
        });
      }
    });
  });
};

const userLogin = (req, res) => {
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.sanitize('username').trim();
  req.sanitize('password').trim();
  let errors = [];
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      res.json({
        errorMsg: errors
      });
    } else {
      models.User.findOne({
        where: {
          [Op.or]: [{ username: req.body.username }, { email: req.body.username }]
        }
      }).then((loginUser) => {
        if (loginUser) {
          if (bcrypt.compareSync(user.password, loginUser.password)) {
            const token = tokenFromUser(loginUser);
            if (token) {
              return res.status(200).json({
                code: 201,
                UserMsg: 'Logged in successfully',
                token,
                data: loginUser
              });
            }
            return res.status(200).json({
              errorMsg: 'Error creating the user token'
            });
          }
          return res.status(200).json({
            password: 'Wrong password'
          });
        }
        return res.status(200).json({
          username: 'You have no login details with us. Kindly sign up with us'
        });
      });
    }
  });
};

const userControllers = {
  getAllUsers,
  createUser,
  userLogin
};

module.exports = userControllers;
