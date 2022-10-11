const Jimp = require("jimp");
const path = require('path');
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const UserService = require("../services/user-service");

class AuthController {
  //  token refresh
  async refreshAccessToken(req, res) {
    console.log("refresh token api invoked");
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
    const user = await UserService.findUser({ _id });

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
      message: "token has been refreshed!",
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
        loggedIn: true,
      });
    } catch (err) {
      if (err?.status === 401) {
        res.status(err.status).json(err);
      }
    }
  }

  // Logout
  async logout(req, res) {
    console.log(req.user);
    const { refreshToken } = req.cookies;

    // delete refresh token from db
    await tokenService.removeToken(refreshToken);

    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({ user: null, loggedIn: false });
  }

  // update user profile
  async updateUserProfile(req, res) {
    try {
      const { authorName, aboutMe, avatar } = req.body;
      const { _id: userId } = req.user;

      if (!authorName || !avatar || !aboutMe) {
        res.status(400).json({ message: "All fields are required!" });
      }

      // Image Base64
      const buffer = Buffer.from(
        avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimResp = await Jimp.read(buffer);
        console.log('first', jimResp)
        jimResp
          .resize(150, Jimp.AUTO)
          .write(path.resolve(__dirname, `../storage/${imagePath}`));
          console.log('2nd', jimResp)

      } catch (err) {
        res.status(500).json({ message: "Could not process the image" });
      }

      // update user
      const user = await userService.findUser({
        _id: userId
      });

      user.authorName = authorName
      user.avatar = `/storage/${imagePath}`;
      user.aboutMe = aboutMe
      user.save()

      res.status(200).json({
        message: "user Updated",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthController();
