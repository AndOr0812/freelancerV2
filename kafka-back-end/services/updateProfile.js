
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the update profile handle request:"+ JSON.stringify(msg));
    console.log(msg.data.emailId);
    var email = msg.data.emailId || null;
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
        var data_to_be_updated = {
            name:msg.data.name,
            phone: msg.data.phone,
            aboutme: msg.data.aboutme,
            imgPath: msg.data.imgPath,
            skills: msg.data.skills
        };

        var updated_data = {
            emailId: email,
            name:msg.data.name,
            phone: msg.data.phone,
            aboutme: msg.data.aboutme,
            imgPath: msg.data.imgPath,
            skills: msg.data.skills
        };
        collection.updateOne({
            _id: /*msg.data.emailid*/email
        },{$set: data_to_be_updated}, function (err, result) {
            console.log(result);
            if (err) {
                res.code = 401;
                res.value = "EmailID doesn't exist";
                res.user = null;
                callback(null, res);
            } else if (result) {
                console.log(`Document returned is ${result}`);
                res.code = 200;
                res.value = "UserProfile Updated Successfully";
                res.user = updated_data;
                callback(null, res);
            }
        });
    }
}

exports.handle_request = handle_request;