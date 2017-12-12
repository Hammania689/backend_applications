// Required libraries for application
const express = require("express");
const mongodb = require("mongodb");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Express object handler
const app = express();

// Ejs enables express to drive data rendered on front end
app.set("view engine", "ejs");

// Body Parser and Static view to capture text and render static webpages
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use to connect to db
var promise = mongoose.connect('mongodb://localhost/backend_fun', {
    useMongoClient: true,
  });

var personSchema = new mongoose.Schema({
    name : String,
    age : Number
});

var User = mongoose.model("User", personSchema);

var isInDataBase = (name,age) =>
{

}

// Routes for pages
app.get('/',(req,res)=> res.render('index.ejs'));

app.post('/',(request,response,next) => {
    
    var name = request.body.name;
    var age = request.body.age;

    
    if(isInDataBase(name,age))
        response.render("profile.ejs", {name : name, age : age});
    else
    {
        var myData = new User(request.body);
        myData.save();

        if(myData.save())
            console.log("saved " + name + " , " + age + " to database");
        else 
            console.log("failed to add to db..");
    }  

    next();
});


app.listen(8080, ()=> console.log('Threat Neutralized'));

module.exports = User;