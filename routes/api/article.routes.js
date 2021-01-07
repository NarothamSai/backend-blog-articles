var express = require("express");
var router = express.Router();

let { articleController } = require("../../components/articles");
let authController = require("../../components/auth/auth.controller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post(
  "/publish",
  authController.isJWTAuthenticated,
  articleController.publish
);

module.exports = router;
