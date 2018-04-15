
function handle_request(msg,collection, callback){

    var res = {};
    console.log("In handle request SIgnup:"+ JSON.stringify(msg));

    console.log(`msg.name is ${msg.name}`);
    console.log(`msg.emailid is ${msg.emailid}`);
    console.log(`msg.password is ${msg.password}`);

    if(msg === undefined || msg.name === undefined || msg.emailid === undefined || msg.password === undefined){
        console.log("Inside the required fields check");
        res.code = 401;
        res.value = "Required fields missing";
        callback(null, res);
        return;
    } else{

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
    });
    }/*
    setTimeout(()=>{
        callback(null, res);
    }, 500);*/
}

exports.handle_request = handle_request;