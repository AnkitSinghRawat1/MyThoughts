const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    authorName: { type: String, require: true },
    password: { type: String, reuire: true },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model('User', userSchema, 'UserCreds')
