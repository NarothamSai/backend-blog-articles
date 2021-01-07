var express = require('express');
var router = express.Router();

let userRoute = require('./user.routes');
let articleRoute = require('./article.routes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/articles',articleRoute);

router.use('/user',userRoute);


module.exports = router;
