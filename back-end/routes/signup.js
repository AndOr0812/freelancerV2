kafka.make_request('login_topic',{"action": action, "username":username,"password":password}, function(err,results){
    console.log('In Kafka: %o', results);
    if(err){
        done(err,{});
    }
    else
    {
        if(results.code == 200){
            done(
                null,
                {
                    username,
                    password
                }
            );
        }
        else {
            done(null,false);
        }
    }
});