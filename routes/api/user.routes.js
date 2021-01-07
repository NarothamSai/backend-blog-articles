var express = require("express");

var router = express.Router();

let { userController } = require("../../components/user");
let authController = require("../../components/auth/auth.controller");

/* GET home page. */
router.get("/", authController.isJWTAuthenticated, userController.getUser);

router.post("/signup", userController.signupUser);

router.put("/login", authController.isAuthenticated, userController.login);

module.exports = router;
