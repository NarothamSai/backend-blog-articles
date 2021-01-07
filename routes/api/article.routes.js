var express = require("express");
var router = express.Router();

let { articleController } = require("../../components/articles");
let authController = require("../../components/auth/auth.controller");

router.get("/", articleController.get);

router.post(
  "/publish",
  authController.isJWTAuthenticated,
  articleController.publish
);

module.exports = router;
