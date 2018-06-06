import users from './routes/users';
import centers from './routes/centers';
import index from './routes/index';
import events from './routes/events';

require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const expressValidator = require('express-validator');

const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use('/api/v1/users', users);
app.use('/api/v1/centers', centers);
app.use('/api/v1/events', events);
app.use('/', index);

app.use('/uploads', express.static(`${__dirname}/uploads`));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.token = req.token;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('==========', err.message);
  // render the error page
  res.status(err.status || 500);

  res.json({
    message: 'This page is not found',
    code: 404
  });
});

module.exports = app;
