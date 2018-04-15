
function handle_request(msg,collection, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.emailid === undefined || msg.password === undefined){
        res.code = 401;
        res.value = "Required fields missing";
        callback(null, res);
        return;
    }

    collection.findOne({
        _id: msg.emailid,
        password: msg.password
    }, function(err, doc){
        console.log(doc);
        if(err){
            res.code = 401;
            res.value = "Failed Login";
            res.user = null;
            callback(null,res);
        } else if(doc){
            console.log(`Document returned is ${doc}`);
            res.code = 200;
            res.value = "Success Login";
            res.user = doc;
            callback(null,res);
        }
    });
}

exports.handle_request = handle_request;