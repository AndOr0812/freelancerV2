
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the getprofile handle request:"+ JSON.stringify(msg));
    console.log(msg.data.emailid);
    var email = msg.data.emailid || null;
    console.log(`email assigned is ${email}`);
    if(/*msg.data.emailid === undefined*/email === null){
        console.log("Inside the getprofile handle_request if section");
        res.code = 401;
        res.value = "EmailID doesn't exist";
        res.user = null;
        callback(null,res);
        return;
    }else {
        console.log("Inside the getprofile handle_request else section");
        collection.findOne({
            _id: /*msg.data.emailid*/email
        }, function (err, doc) {
            console.log(doc);
            if (err) {
                res.code = 401;
                res.value = "EmailID doesn't exist";
                res.user = null;
                callback(null, res);
            } else if (doc) {
                console.log(`Document returned is ${doc}`);
                res.code = 200;
                res.value = "UserProfile Exists";
                res.user = doc;
                callback(null, res);
            }
        });
    }
}

exports.handle_request = handle_request;