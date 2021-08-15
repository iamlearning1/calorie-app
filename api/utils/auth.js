const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'R#%@DYD23WQZ8*$%DIO#' } = process.env;

const generateToken = (id, email) => jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

const hashPassword = async (password) => bcrypt.hash(password, 10);

const comparePassword = async (plain, hash) => bcrypt.compare(plain, hash);

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
