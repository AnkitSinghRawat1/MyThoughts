const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    authorName: { type: String, require: true },
    password: { type: String, reuire: true },
    aboutMe: { type: String, reuire: false },
    avatar: {
      type: String,
      required: false,
      get: (avatar) => {
        if (avatar) return `${process.env.BASE_URL}${avatar}`;

        return avatar;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model('User', userSchema, 'UserCreds')
