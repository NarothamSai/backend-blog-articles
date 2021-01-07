const user = require("./user.model");

exports.getUser = (req, res) => {
  user
    .findOne({})
    .then((user) => {
      res.status(200).send({ user: "user" });
    })
    .catch((err) => {
      res.status(404).send({ message: "error" });
    });
};
