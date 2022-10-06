const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  // generate new tokens
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
      }
    );

    return { accessToken, refreshToken };
  }

  // store refresh token
  async storeRefreshToken(refreshToken, userId) {
    try {
      await tokenModel.create({
        token: refreshToken,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenService();
