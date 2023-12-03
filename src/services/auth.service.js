require('express-async-errors');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const client = require('../utils/database');

const { isPasswordMatched, getToken } = require('../utils/commonFunctions');

const isEmailExist = async (email) => {
  const result = await client.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return result.rows.length > 0;
};

const signup = async ({ name, email, password, address }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  if (await isEmailExist(email))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');

  const newUser = await client.query(
    'INSERT INTO users(name, email, password, address) VALUES($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, address]
  );

  const token = getToken(newUser.id);

  newUser.password = undefined;

  return { token, user: newUser.rows[0] };
};

const login = async ({ email, password }) => {
  const user = await client.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (
    !user.rows.length ||
    !(await isPasswordMatched(password, user.rows[0].password))
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Wrong phone number or password'
    );
  }

  const token = getToken(user.rows[0].id);

  user.rows[0].password = undefined;

  return { user: user.rows[0], token };
};

module.exports = {
  signup,
  login,
};
