
function handle_request(msg,collection, callback){

    var res = {};
    console.log("In handle request SIgnup:"+ JSON.stringify(msg));

    collection.insert({
        name: msg.name,
        _id: msg.emailid,
        password: msg.password
    }, function(err, doc){
        console.log(doc);
        if(err){
            res.code = 401;
            res.value = "Failed Signup";
            callback(null, res);
        } else if(doc){
            console.log(doc);
            res.code = 200;
            res.value = "Success Signup";
            callback(null, res);
        }
    });/*
    setTimeout(()=>{
        callback(null, res);
    }, 500);*/
}

exports.handle_request = handle_request;