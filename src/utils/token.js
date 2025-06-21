const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "some-refresh-secret";

function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken };