const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const productRoute = require('./routes/productRoute');
const usersRouter = require('./routes/usersRouter');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

require('dotenv').config();

const app = express();
const api = process.env.API_URL
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '15kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
      whitelist: [
        'duration',
      ]
    })
);

app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/public/images', express.static(__dirname + '/public/images'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${api}/product`, productRoute);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/reviews`, reviewRouter);
app.use(`${api}/booking`, bookingRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
