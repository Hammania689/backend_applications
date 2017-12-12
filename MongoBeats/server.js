const express = require("express");
const mongodb = require("mongodb");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const app = express();

app.set("view engine", "ejs");

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var promise = mongoose.connect('mongodb://localhost/backend_fun', {
    useMongoClient: true,
    /* other options */
  });
//mongoose.connect("mongodb://localhost/backend_fun");


var personSchema = new mongoose.Schema({
    name : String,
    age : Number
});

var User = mongoose.model("User", personSchema);



app.post('/',(request,response,next) => {
    
    var name = request.body.name;
    var age = request.body.age;
    var myData = new User(request.body);
    myData.save();
    
    if(myData.save())
        console.log("saved " + name + " , " + age + " to database");
    else 
        console.log("failed to add to db..");
    response.redirect('/');
    next();
});

app.get('/',(req,res)=> res.render('index.ejs'));

app.listen(8080, ()=> console.log('Threat Neutralized'));

module.exports = User;