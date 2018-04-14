
function handle_request(msg,collection, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    collection.findOne({
        _id: msg.emailid
    },function(err, doc){
        console.log(doc);
        if(err){
            res.code = 401;
            res.value = "EmailID doesn't exist";
            res.user = null;
            callback(null,res);
        } else if(doc){
            console.log(`Document returned is ${doc}`);
            res.code = 200;
            res.value = "UserProfile Exists";
            res.user = doc;
            callback(null,res);
        }
    });
}

exports.handle_request = handle_request;