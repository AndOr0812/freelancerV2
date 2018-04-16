var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);


var multer = require('multer');
var glob = require('glob');


var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:54000/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
var kafka = require('./routes/kafka/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
};
var d = new Date();

//Cross-Origin connection
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(cors(corsOptions));


//Any routes with /uploads will be handled by this for handling static files
app.use('/uploads/', express.static(path.join('./', 'public','uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: true,
    rolling: true,
    cookie: {
        httpOnly:false,
        maxAge: new Date(Date.now()+ (1000*60*60*24*14))
    },
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
//app.use('/users', users);

//For Handling the Image Upload

var temp_file = "";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        temp_file = file.fieldname + '-' + Date.now() + '.jpeg';
        console.log('file name is');
        console.log(temp_file);
        cb(null, temp_file/*file.fieldname + '-' + Date.now() + '.jpeg'*/)
    }
});
var upload = multer({storage:storage});

app.post('/files/upload',upload.single('mypic'),function (req,res) {
    console.log(req.body);
    console.log(req.file);
    console.log('file name is');
    console.log(temp_file);
    res.status(200).send({
        success:true,
        filename:temp_file
    });
});
//End of handling the File Upload

//For Handling the Edit profile  Route
app.post('/users/profile/update',function (req,res) {
    console.log(JSON.stringify(req.body));
    const emailId = req.body.emailId || null;
    const phone = req.body.phone  || null;
    const imgPath = req.body.imgPath  || null;
    const aboutme = req.body.aboutme  || null;
    const skills = JSON.stringify(req.body.user_skills)  || null;
    console.log("After destructuring");
    console.log('Inside the profile update router');

    if(!emailId){
        console.log("Inside the profile update If emailId passed check");
        res.status(401).send("Email Id is not passed");
        return;
    }
    kafka.make_request('profile_update',{data:{
            emailId:emailId,
            phone: phone,
            imgPath: imgPath,
            aboutme: aboutme,
            skills:skills
        }},function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    });
});


//Route to fetch all Relevant Open Projects

app.post('/project/placebid',function (req,res) {
    console.log(`Inside the place a bid project router`);
    console.log(`req.body is ${req.body}`);
    kafka.make_request('placeBid',{data:req.body},function (err,results) {
        if (err){
            console.log(err);
            res.status(500).send("Error in kafka connectivity");
            return;
        }else {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    })
});

//Route to fetch all Relevant Open Projects

app.get('/project/:project_id',function (req,res) {
    console.log(`Inside the relevant projects router ${req.params.project_id}`);
    kafka.make_request('getProjectDetails',{data:{proj_id:req.params.project_id}},function (err,results) {
        if (err){
            console.log(err);
            res.status(500).send("Error in kafka connectivity");
            return;
        }else {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    })
});


//Route to fetch all Relevant Open Projects

app.get('/projects/relevant/:user_skills',function (req,res) {
    console.log(`Inside the relevant projects router ${req.params.user_skills}`);
    return res.status(201).send("success");
    /*kafka.make_request('getProjects',{data:{proj_status:'open'}},function (err,results) {
        if (err){
            console.log(err);
            res.status(500).send("Error in kafka connectivity");
            return;
        }else {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    })*/
});

//End of All open projects fetch


//Route to fetch all Open Projects

app.get('/projects/all',function (req,res) {
   kafka.make_request('getProjects',{data:{proj_status:'open'}},function (err,results) {
       if (err){
           console.log(err);
           res.status(500).send("Error in kafka connectivity");
           return;
       }else {
           if(results.code == 200){
               return res.status(201).send(results);
           }
           else {
               return res.status(401).send("error");
           }
       }
   })
});

//End of All open projects fetch

//Route to handle the post project functionality

var storage1 = multer.diskStorage({
    destination: 'public/uploads/'
});
var upload1 = multer({
    storage: storage1
});

app.post('/projects/new',upload1.array('files'), function(req, res) {
    console.log("Inside the projects new router");
    console.log(req.body);
    console.log(req.files);
    var proj_msg = /*{
        proj_desc: req.body.proj_desc,
        proj_budget: req.body.proj_budget,​
        proj_name: req.body.proj_name,​
        proj_skills: req.body.proj_skills}*/req.body;
    kafka.make_request('postProject',{data:proj_msg}, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    });
});


//ROute to handle the getUserProfile details
app.get('/profile/getdetails/:emailId',function(req,res){
    console.log("Inside the get profile router");
    var emailId = req.params.emailId || null;
    console.log(`emailId is ${emailId}`);
    if(emailId === 'undefined' || !emailId) {
        console.log("If email id is not passed then i wont make a kafka request");
        return res.status(401).send("error");
    }else {
    console.log(`The email ID for which the profile needs to be fetched is`);
    console.log(emailId);
    kafka.make_request('profile', {data:{
        "emailid": emailId}
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                return res.status(201).send(results);
            }
            else {
                return res.status(401).send("error");
            }
        }
    });
    }
});


//Route to handle the logout
app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.cookie.expires = new Date();
    req.session.cookie.maxAge = new Date();
    //req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});


//Route to handle the login
app.post('/login', function(req, res) {
    console.log(`received login request is ${req.body}`)
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
            return;
        }

        if(!user) {
            res.status(401).send();
            return;
        }
        req.session.user = user.name;
        req.session.emailid = user._id;
        console.log(req.session.user);
        console.log("session initilized");
        return res.status(201).send({name:user.name, emailid: user._id});
    })(req, res);
});



//Handling the signUp route
app.post('/signup', function (req,res) {
    var name = req.body.name;
    var emailid = req.body.emailid;
    var password = req.body.password;
    kafka.make_request('login_topic', {
        "action": 'signup',
        "name":name,
        "emailid": emailid,
        "password":password
    }, function(err,results){
        console.log('In Kafka: %o', results);
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                return res.status(201).send({name:name,emailid:emailid});
            }
            else {
                return res.status(401).send("error");
            }
        }
    });
});


module.exports = app;
