var express = require('express');
const database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mailer', { title: 'Register' });
});

router.post('/registerUser', function(req, res, next) {
    //insert into db
    console.log(req);

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

    console.log("Before inputting to database..");
    database.addMember(newCustomer);
    console.log("After database..");

    //render
    res.render('inserted', {customer: newCustomer});
});

module.exports = router;
