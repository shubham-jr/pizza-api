const mongoose = require('mongoose');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const config = require('../utils/config');
const logger = require('../utils/logger');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    let message =
      error.message || err.code === 11000 ? err : httpStatus[statusCode];

    if (err.name === 'CastError') {
      // For "CastError," provide a custom message and set the status code to BAD_REQUEST
      message = 'Wrong ID format';
    }

    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line prefer-const
  let { statusCode, message } = err;
  if (config.env === 'production') {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line no-unused-expressions
    message;
  }
  const response = {
    code: statusCode,
    status: 'fail',
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.locals.errorMessage = err.message;

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
