import swagger from 'swagger-ui-express';
import cors from 'cors';
import users from './routes/users';
import centers from './routes/centers';
import index from './routes/index';
import events from './routes/events';
import swaggerDocument from './swagger.json';


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
app.use(cors());
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../client/dist/'));
app.use(expressValidator());


app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/api/v1/users', users);
app.use('/api/v1/centers', centers);
app.use('/api/v1/events', events);

app.use('/uploads', express.static(`${__dirname}/uploads`));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

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
  // render the error page
  res.status(err.status || 500);

  res.json({
    message: 'This page is not found',
    code: 404
  });
});

module.exports = app;
