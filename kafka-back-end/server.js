var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var getProfile = require('./services/getProfile');
var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();



// Add MongoDB connections
const MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/Freelancer';

var collection;

MongoClient.connect(mongoURL, function (err, db) {
    if(err) {
        console.log("Unable to connect to MongoDB");
    } else {
        console.log("Connected to MongoDB");
        collection = db.collection('freelancer');
    }
});


/*
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});*/

//To Handle the Kafka Consumer error
consumer.on('error', function (err) {
    console.log(`Error: ${err}`);
});

//To handle the OFFset Out of Range Error
consumer.on('offsetOutOfRange', function (err) {
    console.log(`Offset Error: ${JSON.stringify(err)}`);
});

//When message is received from the kafka topic
consumer.on('message',  (message) => {
    console.log('Received message on Topic ');
    console.log(`data: ${message.value}`)
    var data = JSON.parse(message.value);
    let handler;
    console.log(data.replyTo);
    switch(data.replyTo.slice(0, -9)) {
        case 'login_topic':
            if(data.data.action === 'login'){
                handler = login;
            } else if(data.data.action === 'signup') {
                handler = signup;
            } else {
                handler = persistedLogin;
            }
            break;
        case 'profile':
            handler = getProfile;
            break;
    }

    handler.handle_request(data.data, collection, function(err,res){
        console.log('after handle: %o',res);
        var payloads = [
            {
                topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId: data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            if(err){
                console.log(err);
            } else {
                console.log('Data sent by Producer: ');
                console.log(data);
            }
        });
        return;
    });
});

console.log('server is running');
