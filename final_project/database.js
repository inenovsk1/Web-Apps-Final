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



exports.addMember = function (member) {
    let collection = db.collection('Contacts');

    collection.insertOne({
        title: member.title,
        firstName: member.firstName,
        lastName: member.lastName,
        street: member.street,
        city: member.city,
        state: member.state,
        zip: member.zip,
        phone: member.phone,
        email: member.email}, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
    });
}





/**
 * This function retrieves orders and constructs an array 
 * of objects with additional details about the order's
 * customer and product.  
 * 
 * The options object MAY include an "_id" property.  If it does, 
 * this function should only return one order (of matching id). 
 * If the "id" property in "options" is not defined, return all orders.
 * 
 * Required return value:
 * An array of objects with the following structure:
 * 
 *   id (order ID)
 *   date (order Date)
 *   customer_name (first and last name)
 *   product_name (product name)
 *   product_price price (product price)
 * 
 * 
 * 20 Points
 */
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

/**
 * This function retrieves customers and returns them as an array. 
 * 
 * The options object MAY include an "_id" property.  If it does, 
 * this function should only return (an array of) one customer (of matching id). 
 * If the "_id" property in "options" is not defined, return all orders.
 * 
 * Required return value: array of customer objects (with all customer data)
 * 
 *10 Points
 */
exports.getCustomers = function (options, callback) {

    if (options._id !== undefined) {
        // return that one customer with specified ID
        let collection = db.collection('Customers');
        collection.find({ _id : options._id }).toArray(function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }
    else {
        //return all the customers
        let collection = db.collection('Customers');
        collection.find({}).toArray(function (err, results) {
            if (err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }

}

/**
 * This function retrieves products and returns them as an array. 
 * 
 * The options object MAY include an "_id" property.  If it does, 
 * this function should only return (an array of) one product (of matching id). 
 * If the "id" property in "options" is not defined, return all orders.
 * 
 * Required return value: array of product objects (with all product data)
 * 
 * 10 Points
 */
exports.getProducts = function (options, callback) {

    if(options._id !== undefined) {
        //return that specific product
        let collection = db.collection('Products');
        collection.find({_id : options._id}).toArray(function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }
    else {
        //return all products
        let collection = db.collection('Products');
        collection.find({}).toArray(function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(err, results);
        });
    }
}

/**
 * This function accepts an order object an inserts it into the ORDERS table.
 * 
 * 10 Points
 */
exports.addOrder = function (order, callback) {
    let collection = db.collection('Orders');
    collection.insertOne({customer_name : order.customer_name,
                          product_name : order.product_name,
                          product_price : order.product_price,
                          date : new Date(order.date.toISOString())},
        function(err, results) {
            if(err) {
                console.log(err);
                return;
            }
            callback(err, results);
        }
    );
}

/**
 * This function accepts a customer object an inserts or updates it into the CUSTOMERS table.
 * 
 * If customer._id is defined, the customer object represents an existing customer, and you 
 * must issue an update command.  Otherwise, insert.
 * 
 * 10 Points
 */
exports.upsertCustomer = function (customer, callback) {

    if(customer._id === undefined) {
        //insert
        let collection = db.collection('Customers');
        collection.insertOne({firstName : customer.firstName,
                              lastName : customer.lastName,
                              street : customer.street,
                              city : customer.city,
                              state : customer.state,
                              zip : customer.zip },
            function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                callback(err, results);
            }
        );
    }
    else {
        //update
        let collection = db.collection('Customers');
        collection.updateOne({_id : customer._id}, {$set : {firstName : customer.firstName,
                                                            lastName : customer.lastName,
                                                            street : customer.street,
                                                            city : customer.city,
                                                            state : customer.state,
                                                            zip : customer.zip}}, 
            function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                callback(err, results);
            }
        );
    }
}

/**
 * This function accepts a product object an inserts or updates it into the PRODUCTS table.
 * 
 * If product._id is defined, the product object represents an product customer, and you 
 * must issue an update command.  Otherwise, insert.
 * 
 * 10 Points
 */
exports.upsertProduct = function (product, callback) {

    if(product._id === undefined) {
        //insert a product
        let collection = db.collection('Products');
        collection.insertOne( {name : product.name, price : product.price},
            function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                callback(err, results);
            }
        );
    }
    else {
        //update a product
        let collection = db.collection('Products');
        collection.updateOne({_id : product._id}, {$set : {name : product.name,
                                                           price : product.price}},
            function(err, results) {
                if(err) {
                    console.log(err);
                    return;
                }
                callback(err, results);
            }
        );
    }
}

/**
* The following delete methods all accept an ID, and should delete the Order/Customer/Product
* out of the corresponding table with the matching ID.  

*  Total 30 points for all three
*/
exports.deleteOrder = function (id, callback) {

    let collection = db.collection('Orders');
    collection.deleteOne({_id : id}, function(err, results) {
        if(err) {
            console.log(err);
            return;
        }
        callback(err, results);
    });

}

exports.deleteCustomer = function (id, callback) {

    let collection = db.collection('Customers');
    collection.deleteOne({_id : id}, function(err, results) {
        if(err) {
            console.log(err);
            return;
        }
        callback(err, results);
    });

}

exports.deleteProduct = function (id, callback) {

    let collection = db.collection('Products');
    collection.deleteOne({_id : id}, function(err, results) {
        if(err) {
            console.log(err);
            return;
        }
        callback(err, results);
    });

}
