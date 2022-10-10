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
    } else {
      return this.verifyPassword(isAlreadyUser, authorName, password);
    }

  }

  // to check password
  async verifyPassword(userData, authorName, password) {
    const verifiedPassword = await this.createSecurePassword(authorName, password);

    if (userData["password"] === verifiedPassword) {
      console.log('object', verifiedPassword);
      return userData
    }


    throw {message: 'Wrong Password', status : 401}
  }

  async createSecurePassword(userName, password) {
    const data = `${userName}.${password}`;
    return crypto
      .createHmac("sha512", process.env.PASS_SECRET)
      .update(data)
      .digest("hex");
  }

  async findUser(filter) {
    return await userModel.findOne(filter);
  }
}

module.exports = new UserService();
