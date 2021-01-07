var express = require("express");

var router = express.Router();

let { userController } = require("../../components/user");

/* GET home page. */
router.get("/", userController.getUser);

module.exports = router;
