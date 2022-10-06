const userModel = require("../models/user-model");
const UserService = require("../services/user-service");

class AuthController {
  // Login or signup
  async login(req, res) {
    try {
      const {authorName} = await UserService.createOrLoginUser(req.body)
      
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
