var express = require("express");
var router = express.Router();

let apiRoute = require("./api");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api", apiRoute);

module.exports = router;
