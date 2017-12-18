var express = require('express');
var router = express.Router();

const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    database.getContacts((contacts) => {
        res.render('contacts', {contacts: contacts});
    });
});

router.post('/update', function(req, res, next) {
    // constructing an object
    let member = {};

    var names = ["firstName",
    "lastName",
    "street",
    "city",
    "state",
    "zip",
    "phone",
    "email", "how", "title"];

    member.id = req.body['contact-id'];
    member._id = member.id;
    for(var i in names) {
        var attr = names[i];
        member[attr] = req.body[attr];
    }
    database.update(member, function(result) {
        res.setHeader('Content-Type', 'application/json');
        member.status = result;
        res.send(member);
    });
});

router.post('/create', function(req, res, next) {
    // constructing an object
    let member = {};

    var names = ["firstName",
    "lastName",
    "street",
    "city",
    "state",
    "zip",
    "phone",
    "email", "how", "title"];

    member.id = req.body['contact-id'];
    member._id = member.id ;
    for(var i in names){
        var attr = names[i];
        member[attr] = req.body[attr];
    }

    database.addMember(member, function(results) {
        member.status = results;
        member.id = member._id;
        res.send(member)
    });
});

router.post('/delete', function(req, res, next) {
    console.log("Deleting " + req.body.id);
    database.deleteMember({
        id: req.body.id
    }, function(results){
        console.log(results)
        res.send(results)
    })
});


module.exports = router;
