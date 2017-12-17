var express = require('express');
var router = express.Router();

const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let contacts = database.getContacts((contacts) => {
        res.render('contacts', {contacts: contacts});
    });
});


module.exports = router;
