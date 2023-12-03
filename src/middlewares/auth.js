const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const client = require('../utils/database');

const ApiError = require('../utils/ApiError');
const config = require('../utils/config');

const protect = async (req, res, next) => {
  let token =
    req.headers['x-access-token'] ||
    req.headers.authorization ||
    req.body.token;
  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ authenticated: false, message: 'No token given' });
    // throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
  }

  token = token.startsWith('Bearer') && token.split(' ')[1];

  if (!token || token === '') {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ authenticated: false, message: 'Invalid token' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: false,
      authenticated: false,
      message: 'Invalid token, login first!',
    });
  }

  const user = await client.query('SELECT * FROM users WHERE id = $1', [
    decoded.id,
  ]);

  if (!user.rows.length) throw new ApiError(404, 'User not found from token');

  // eslint-disable-next-line
  req.user = user.rows[0];

  // write business logic here

  next();
  // eslint-disable-next-line consistent-return
};

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: 'FORBIDDEN',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
    // eslint-disable-next-line consistent-return
  };

module.exports = { protect, restrictTo };
