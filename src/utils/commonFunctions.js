const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const isPasswordMatched = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  getToken,
  isPasswordMatched,
};
