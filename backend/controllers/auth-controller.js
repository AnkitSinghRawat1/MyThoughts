const userModel = require("../models/user-model");
const tokenService = require("../services/token-service");
const UserService = require("../services/user-service");

class AuthController {
  // Login or signup
  async login(req, res) {
    try {
      const {authorName, _id} = await UserService.createOrLoginUser(req.body)
      
      // generate Tokens

      const { accessToken, refreshToken } = await tokenService.generateToken({user: authorName, _id})

      // storing refreshToken
      await tokenService.storeRefreshToken(refreshToken, _id)

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
  
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      
        res.status(200).json({
          message: 'user logged in'  ,
          user: {authorName}  
        });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthController();
