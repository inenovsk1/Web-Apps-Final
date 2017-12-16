var express = require('express');
const database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/index', function(req, res, next) {
    res.render('index', {title: 'Home'});
});

module.exports = router;
