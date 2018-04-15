
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the postProject handle request:"+ JSON.stringify(msg));


    var prj_updt = msg.data;
    if(/*msg.data.emailid === undefined*/!prj_updt.proj_name){
        console.log("Inside the postProject handle_request if section");
        res.code = 401;
        res.value = "project name is required";
        res.user = null;
        callback(null,res);
        return;
    }else {
        console.log("Inside the postProject handle_request else section");
        collection.insert(prj_updt, function (err, doc) {
            console.log(doc);
            console.log(doc[0]);
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