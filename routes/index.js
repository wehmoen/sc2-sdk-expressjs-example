var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let session = false;
  if (req.session.steem) {
    session = req.session.steem;
  }
  res.render('index', { title: 'SteemConnect v2 ExpressJS Example Application', session: session });
});

module.exports = router;
