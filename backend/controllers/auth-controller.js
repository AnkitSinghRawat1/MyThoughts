const userModel = require("../models/user-model");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const UserService = require("../services/user-service");

class AuthController {
  //  token refresh
  async refreshAccessToken(req, res) {
    //  get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // check if token is valid
    let userData;
    try {
      const userData = await tokenService.verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // check if token is in DB
    try {
      const token = await tokenService.findRefreshToken({
        userData: _id,
        refreshTokenFromCookie,
      });

      if (!token) return res.status(401).json({ message: "Invalid token" });
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }

    // check if valid user
    const user = await userService.findUser({ _id });

    if (!user) return res.status(404).json({ message: "No user" });

    // Generate new Tokens
    const { refreshToken, accessToken } = await tokenService.generateToken({
      _id,
      authorName,
    });

    // update refresh token (in DB)
    try {
      await tokenService.updateRefreshToken(_id, authorName);
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }

    // put tokens in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    // send Response 
    res.status(200).json({
      message: 'token has been refreshed!'
    });
  }

  // Login or signup
  async login(req, res) {
    try {
      const { authorName, _id } = await UserService.createOrLoginUser(req.body);

      // generate Tokens

      const { accessToken, refreshToken } = await tokenService.generateToken({
        user: authorName,
        _id,
      });

      // storing refreshToken
      await tokenService.storeRefreshToken(refreshToken, _id);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.status(200).json({
        message: "user logged in",
        user: { authorName },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthController();
