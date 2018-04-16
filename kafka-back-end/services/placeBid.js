var mongo = require('mongodb');
function handle_request(msg,collection, callback){

    var res = {};
    console.log("Inside the place a bid handle request:"+ JSON.stringify(msg));
    console.log(msg.data);
    var o_id = new mongo.ObjectID(msg.data.proj_id);
    var bid_userId= msg.data.bid_userId;
    var bid_userName= msg.data.bid_userName;
    var bid_amount= msg.data.bid_amount;
    var bid_period= msg.data.bid_period;
    var bid_status= msg.data.bid_status;

    var new_bid ={
        bid_userId:bid_userId,
        bid_userName:bid_userName,
        bid_amount: bid_amount,
        bid_period: bid_period,
        bid_status: bid_status
    };

// Fetch all results
    collection.updateOne({"_id":o_id},{$push:{bids:new_bid}},function(err, result) {
        console.log(result);
        if (err) {
            res.code = 401;
            res.value = "Project ID doesn't exist";
            res.bid = null;
            callback(null, res);
        } else if (result) {
            console.log(`Document returned is ${result}`);
            res.code = 200;
            res.value = "Bid Placed successfully";
            res.bid = msg.data;
            callback(null, res);
        }
    });

}

exports.handle_request = handle_request;