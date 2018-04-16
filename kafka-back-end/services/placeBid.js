var mongo = require('mongodb');
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the place a bid handle request:"+ JSON.stringify(msg));
    console.log(msg.data);
    var o_id = new mongo.ObjectID(msg.data.proj_id);

// Fetch all results
    collection.update({"_id":o_id},function(err, doc) {
        if (err) {
            res.code = 200;
            res.value= "Error while fetching all open projects";
            res.projects = null;
            callback(null,res);
            return;
        }

        console.log(JSON.stringify(doc));
        console.log("retrieved record of open project:");
        console.log(doc);
        res.code = 200;
        res.value= "Success";
        res.projectdetails = doc;
        callback(null,res);
        return;
    });

}

exports.handle_request = handle_request;