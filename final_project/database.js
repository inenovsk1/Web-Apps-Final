var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'final_projectDB';
var db;

// When this file is required, the connect method will be invoked.  
// Unless a web request comes in immediately, db will be set by the 
// time any of your functions below are called.
MongoClient.connect(url, function (err, client) {
    if(err) {
        console.log("Error connecting to db..");
        console.log(err);
    }

    console.log("Connected correctly to mongo server!");
    db = client.db(dbName);
});



exports.addMember = function (member, callback) {
    let collection = db.collection('Contacts');

    member.how = member.how ? member.how : "None";
    delete member.id
    delete member._id
    collection.insertOne(member, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }

        callback(result);
    });
}


exports.getContacts = function(callback) {
    let collection = db.collection('Contacts');

    collection.find().toArray((err, result) => {
        if(err) {
            console.log(err);
            return;
        }

        callback(result);
    });
}


// fix this later
exports.update = function (member, callback) {

    //update a product
    let collection = db.collection('Contacts');
    let objID = ObjectID(member._id);

    collection.updateOne({_id : objID}, {$set : {title: member.title,
                                                firstName: member.firstName,
                                                lastName: member.lastName,
                                                street: member.street,
                                                city: member.city,
                                                state: member.state,
                                                zip: member.zip,
                                                phone: member.phone,
                                                email: member.email,
                                                how: member.how}},
        function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(results);
        }
    );
}


exports.deleteMember = function(member, callback) {
    let collection = db.collection('Contacts');
    let objID = ObjectID(member.id);

    collection.deleteOne({_id : objID}, function(err, results) {
        if(err) {
            console.log(err);
            return;
        }
        callback(results);
    });
}

// Very iportnt - do not delete!
exports.getOrders = function (options, callback) {

    if(options._id !== undefined) {
        //return a particular order
        let collection = db.collection('Orders');
        collection.find({_id : options._id}).toArray(function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }
    else {
        //return all the orders
        let collection = db.collection('Orders');
        collection.find({}).toArray(function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }
}
