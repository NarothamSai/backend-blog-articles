const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./user.model");

exports.getUser = (req, res) => {
  console.log("getuser");
  userModel
    .findOne({ _id: req.user._id })
    .select("-password")
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      res.status(404).send({ message: "error" });
    });
};

exports.signupUser = async (req, res) => {
  const password = req.body.password;
  const BCRYPT_SALT_ROUNDS = 10;
  await bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function (err, hash) {
    let user = new userModel({
      about: req.body.about,
      age: req.body.age,
      email: req.body.email,
      name: req.body.name,
      password: hash,
      username: req.body.username,
    });
    user
      .save()
      .then((user) => {
        let body = { username: user.username, _id: user._id };
        const token = jwt.sign({ user: body }, process.env.JWTSECRET);
        res
          .status(200)
          .send({ message: "The user has been signedup.", token: token });
      })
      .catch((err) => {
        console.log(err);
        // Already user with email or username exists
        if (err.code == 11000) {
          let message = "User with ";
          for (let key in err.keyPattern) {
            message += key + " " + req.body[key];
          }
          message +=
            " already exists.Please login or sign up with another email.";
          res.status(403).send({ message: message });
        } else {
          res.status(404).send({ message: err.message });
        }
      });
  });
};

exports.login = (req, res) => {
  let { user } = req;
  let body = { username: user.username, _id: user._id };
  const token = jwt.sign({ user: body }, process.env.JWTSECRET);
  res.status(200).send({ token: token });
};
