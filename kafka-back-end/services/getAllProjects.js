var assert = require('assert')
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the get all open projects handle request:"+ JSON.stringify(msg));
    console.log(msg.data.proj_status);
/*    collection.find({
        proj_status: msg.data.proj_status
    }, function (err, doc) {
        console.log(doc);
        if (err) {
            res.code = 401;
            res.value = "No Open Projects";
            res.user = null;
            callback(null, res);
        } else if (doc) {
            console.log(`Document returned is ${doc}`);
            res.code = 200;
            res.value = "UserProfile Exists";
            res.user = doc;
            callback(null, res);
        }
    });*/

// Fetch all results
    collection.find({"proj_status":msg.data.proj_status}).toArray(function(err, items) {
        /*assert.equal(null, err);*/
        if (err) {
            res.code = 200;
            res.value= "Error while fetching all open projects";
            res.projects = null;
            callback(null,res);
            return;
        }
/*
        assert.equal(0, items.length);
*/
        console.log(JSON.stringify(items));
        console.log("retrieved record of open project:");
        console.log(items);
        res.code = 200;
        res.value= "Success";
        res.projects = items;
        callback(null,res);
        return;
    });

}

exports.handle_request = handle_request;