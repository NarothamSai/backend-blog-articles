const { dbConnect } = require("../../connect");
const instance = dbConnect.blogDB;
const ObjectId = instance.Schema.Types.ObjectId;
const bcrypt = require("bcrypt");

const UserSchema = instance.Schema(
  {
    about: String,
    age: Number,
    articleIds: { type: [ObjectId], ref: "article" },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

let user = instance.model("user", UserSchema);

module.exports = user;
