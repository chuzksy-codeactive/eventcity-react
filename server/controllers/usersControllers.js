/**
 * User Controller
 * handles every user related task and authentication
 */

import models from '../models';

require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtSimple = require('jwt-simple');

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const tokenFromUser = (user) => {
  const timeStamp = new Date().getTime();
  return jwtSimple.encode(
    { sub: user.id, iat: timeStamp },
    process.env.TOKEN_SECRET
  );
};

/**
 * getAllUsers - get all registered users
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} user
 */
const getAllUsers = (req, res) => {
  models.User.findAll().then((users) => {
    if (!users) {
      return res
        .status(204)
        .json({
          message: 'No user found in the database',
        });
    }
    return res
      .status(200)
      .json({
        data: users
      });
  });
};

/**
 * getUsersPerPage - get users using pagination
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} users
 */

const getUsersPerPage = (req, res) => {
  const limit = 5;
  let offset = 0;
  models.User.findAndCountAll().then((data) => {
    let { page } = req.params;
    const isNum = isNaN(req.params.page); //eslint-disable-line 
    page = parseInt(page, 10);
    const pages = Math.ceil(data.count / limit);
    if (page <= 0 || !Number.isInteger(page) || isNum) {
      return res.status(400).json({
        message: 'Invalid page number, should start with 1'
      });
    }
    offset = limit * (page - 1);
    models.User.findAll({
      limit, offset, order: [['id', 'ASC']]
    }).then((users) => {
      res.status(200).json({
        data: users,
        count: data.count,
        pages
      });
    });
  }).catch(err => res.stauts(500).send('Internal server error'));
};

/**
   * createUser - create a user in the app
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} data (user)
   */

const createUser = (req, res) => {
  let imageName = null;
  let imageUrl = null;
  req.checkBody('username', 'Username is required').notEmpty();
  req
    .checkBody('username', 'Username must be between 6-25 character long')
    .len(6, 25);
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Invalid email address').isEmail();
  req.checkBody('password', 'Password field must not be empty').notEmpty();
  req
    .checkBody('password', 'Password must be between 8-100 character long')
    .len(8, 100);
  req.checkBody('firstname', 'firstname is required').notEmpty();
  req.checkBody('lastname', 'lastname is required').notEmpty();

  req.sanitize('username').trim();
  req.sanitize('email').trim();

  if (req.file) {
    imageUrl = req.file.path;
    imageName = req.file.originalname;
  } else {
    imageName = 'no_image.png';
    imageUrl = 'no_image_url';
  }

  let errors = [];

  const hashPassword = bcrypt.hashSync(req.body.password);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      return res.status(400).json({
        message: errors
      });
    }
    models.User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
      }
    }).then((user) => {
      if (user) {
        if (user.username === req.body.username) {
          return res.status(409).json({
            message: 'Username is already taken'
          });
        } else if (user.email === req.body.email) {
          return res.status(409).json({
            message: 'Email is already taken'
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
            return res.status(201).json({
              message: 'New user has been created successfully',
              data: u,
              token: tokenFromUser(u)
            });
          }
          return res.status(500).json({
            message: 'There is an internal server error'
          });
        });
      }
    });
  });
};


/**
 * userLogin - signin a user
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} (token, message, user)
 */
const userLogin = (req, res) => {
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.sanitize('username').trim();
  req.sanitize('password').trim();
  let errors = [];
  const user = {
    username: req.body.username,
    email: req.body.username,
    password: req.body.password
  };
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      errors = result.array().map(e => e.msg);
      res.status(400).json({
        message: errors
      });
    } else {
      models.User.findOne({
        where: {
          [Op.or]: [
            { username: req.body.username },
            { email: req.body.username }
          ]
        }
      }).then((loginUser) => {
        if (loginUser) {
          if (bcrypt.compareSync(user.password, loginUser.password)) {
            const token = tokenFromUser(loginUser);
            if (token) {
              return res.status(202).json({
                message: 'Logged in successfully',
                token,
                data: loginUser
              });
            }
            return res.status(401).json({
              message: 'Error creating the user token'
            });
          }
          return res.status(401).json({
            message: 'Wrong password'
          });
        }
        return res.status(404).json({
          message: 'You have no login details with us. Kindly sign up with us'
        });
      });
    }
  });
};

const userControllers = {
  getAllUsers,
  createUser,
  userLogin,
  getUsersPerPage
};

module.exports = userControllers;
