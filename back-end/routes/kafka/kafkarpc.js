var crypto = require('crypto');
var conn = require('./Connection');

var TIMEOUT=88000; //time to wait for response in ms
var self;

exports = module.exports =  KafkaRPC;

function KafkaRPC(){
    self = this;
    this.connection = conn;
    this.requests = {}; //hash to store request in wait for response
    this.response_queue = false; //placeholder for the future queue
    this.producer = this.connection.getProducer();
}

/* Make request to a topic */

KafkaRPC.prototype.makeRequest = function(topic_name, content, callback){
    console.log(`Kafkarpc-Content: ${JSON.stringify(content)}`);
    console.log('kafka_make_request with topic_name:' + topic_name);
    //var response_topic_name = topic_name +'_response';
    self = this;

    //generate a unique correlation id for this call
    var correlationId = crypto.randomBytes(16).toString('hex');

    //create a timeout for what should happen if we don't get a response
    var tId = setTimeout(function(correlationId){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout');
        callback(new Error("timeout " + correlationId));
        //delete the entry from hash
        delete self.requests[correlationId];
    }, TIMEOUT, correlationId);

    //create a request entry to store in a hash
    var entry = {
        callback:callback,
        timeout: tId //the id for the timeout so we can clear it
    };

    //put the entry in the hash so we can match the response later
    self.requests[correlationId]=entry;
/*
    //create response topic
    self.producer.createTopics(['login_topic_response','profile_response','profile_update_response'], false, function (err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Response Topic created: ' + data);
        }
    });*/

    //make sure we have a response topic
    self.setupResponseQueue(self.producer, topic_name, function(){

        self.response_queue = false;
        //put the request on a topic

        var payloads = [
            { topic: topic_name, messages: JSON.stringify({
                    correlationId:correlationId,
                    topic: topic_name,
                    replyTo: 'response_topic',
                    data:content}),
                partition:0}
        ];
        console.log('Check if producer is ready:');
        console.log(self.producer.ready);

        console.log(payloads[0]);

        self.producer.send(payloads, function(err, data){
            console.log('Producer sending');
            if(err){
                console.log(err);
            }
            console.log(data);
        });
    });
};


KafkaRPC.prototype.setupResponseQueue = function(producer,topic_name, next){
    /*var response_topic_name = topic_name+'_response';*/
    //don't mess around if we have a queue
    if(this.response_queue) return next();

    self = this;

    //subscribe to messages
    var consumer = self.connection.getConsumer(/*response_topic_name*/'response_topic');
    consumer.on('message', function (message) {
        console.log('Response msg received on node');
        var data = JSON.parse(message.value);
        //get the correlationId
        var correlationId = data.correlationId;
        //is it a response to a pending request
        if(correlationId in self.requests){
            //retrieve the request entry
            var entry = self.requests[correlationId];
            //make sure we don't timeout by clearing it
            clearTimeout(entry.timeout);
            //delete the entry from hash
            delete self.requests[correlationId];
            //callback, no err
            entry.callback(null, data.data);
        }
    });
    self.response_queue = true;
    console.log('returning next');
    return next();
};