const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function genAccessToken(payload) {
  if (payload === "" || payload === undefined) {
    return this.Error("Access token requires a payload field but got none");
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

function genRefreshToken(payload) {
  if (payload === "" || payload === undefined) {
    return this.Error("Refresh token requires a payload field but got none");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1yr" });
}

module.exports = {
  genAccessToken,
  genRefreshToken
}