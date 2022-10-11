const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService {
  // generate new tokens
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });

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

  //   verify access token
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  //    verify refresh token
  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }

  //   find refresh token
  async findRefreshToken(token, userId) {
    return await tokenModel.findOne({
      userId,
      token,
    });
  }

  // update refresh token
  async updateRefreshToken(userId, token) {
    return await tokenModel.updateOne({
      userId,
      token,
    });
  }
  
//   delete refresh token
async removeToken(refreshToken) {
    return await tokenModel.deleteOne({ token: refreshToken });
}
}

module.exports = new TokenService();
