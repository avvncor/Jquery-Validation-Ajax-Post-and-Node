const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./modal/model');

//Database Connection
mongoose.connect('mongodb://localhost/eoa1',{'useNewUrlParser':true});
mongoose.connection.once('open',()=>{
    console.log('connection established')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
    next();
  });

//Json Body Parser
//var urlencodedParser =  bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Get a User - API
app.get('/user/:name',(req,res,next)=>{ 
    User.find({name:req.params.name})
    .then(doc=>{
        res.status(200).json({"Collection of":"Users", "User":doc})
    })
})

//Get All Users - API
app.get('/users',(req,res,next)=>{ 
    User.find()
    .then(doc=>{
        res.status(200).json({"Collection of":"Users", "Users":doc})
    })
})

//Post Users API
app.post('/',(req,res,next)=>{

    var user = new User({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        qualification:req.body.qualification
    })

    user.save()
    .then((doc)=>{
        res.status(200).json(doc)
    })
    .catch(error=>{
        res.status(200).json(error);
    })
     
})

//Exporting app to Server
module.exports = app;