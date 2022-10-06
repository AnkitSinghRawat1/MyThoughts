const userModel = require("../models/user-model");
const crypto = require("crypto");

class UserService {
  async createOrLoginUser(userData) {
    const { authorName, password } = userData;

    const isAlreadyUser = await userModel.findOne({ authorName });

    if (!isAlreadyUser) {
      const safePassword = await this.createSecurePassword(
        authorName,
        password
      );
      return await userModel.create({ authorName, password: safePassword });
    }

    return isAlreadyUser;
  }

  async createSecurePassword(userName, password) {
    const data = `${userName}.${password}`;
    return crypto
      .createHmac("sha512", process.env.PASS_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new UserService();
