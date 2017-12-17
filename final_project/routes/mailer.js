var express = require('express');
const database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mailer', { title: 'Register' });
});

router.get('/asd', function(req, res) {
    res.send("opa");
})

router.post('/registerUser', function(req, res, next) {
    //insert into db
    let newCustomer = {};
    newCustomer.title = req.body.title;
    newCustomer.firstName = req.body.firstName;
    newCustomer.lastName = req.body.lastName;
    newCustomer.street = req.body.street;
    newCustomer.city = req.body.city;
    newCustomer.state = req.body.state;
    newCustomer.zip = req.body.zip;
    newCustomer.phone = req.body.phone;
    newCustomer.email = req.body.email;

    database.addMember(newCustomer);

    //render
    res.render('inserted', {customer: newCustomer});
});

module.exports = router;
