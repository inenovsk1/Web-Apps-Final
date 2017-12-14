var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/index', function(req, res, next) {
    res.render('index', {title: 'Home'});
});

router.post('/registerUser', function(req, res, next) {
    // push person to db later but this works for now
    res.send('Member registered!');
});

module.exports = router;
