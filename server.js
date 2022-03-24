// setup our requires
const HTTP_PORT = 8080;
const express = require("express");
const exphbs = require("express-handlebars");
var path = require("path");

const app = express();

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Register handlebars as the rendering engine for views
app.engine(".hbs", exphbs.engine({ 
    extname: ".hbs", 
    defaultLayout: "main",
    helpers: {
        strong: function(options){
            return '<strong>' + options.fn(this) + '</strong>';
        },
        list: function(context, options) {
            var ret = "<ul>";
            
            for(var i = 0; i < context.length; i++) {
                ret = ret + "<li>" + options.fn(context[i]) + "</li>";
            }
            
            return ret + "</ul>";
        }
    }
}));
app.set("view engine", ".hbs");

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.send("Hello World<br /><a href='/about'>Go to the about page</a> " + " " + "<a href='/viewData'>View data</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/viewData", function(req,res){

    var someData = [{
        name: "John",
        age: 23,
        occupation: "developer",
        company: "Scotiabank"
    },
    {
        name: "Sarah",
        age: 32,
        occupation: "manager",
        company: "TD"
    },
    {
        name: "Charles",
        age: 28,
        occupation: "programmer",
        company: "IUK Web Team"
    }];

    res.render('viewData', {
        data: someData,
        //layout: false // do not use the default Layout (main.hbs)
    });

});

// start the server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
/*Mongoose code)
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// connect to Your MongoDB Atlas Database

mongoose.connect("Input connection string here");

// define the company schema
var employSchema = new Schema({
  "Name": {
    type: String,
    unique: true
  },
  "Age": {
    type: Number,
    default: 0
  },
  "Occupation": String,
  "Company": String
});

var employee = mongoose.model("web322_employees", employSchema);

// create a new company
var employee1 = new employee({
  Name: "John",
  Age: 20,
  Occupation: "Developer",
  Company: "SocotiaBank"
});
// define the company schema

var workSchema = new Schema({
    "Name": {
        type: String,
        unique: true
      },
    "Age": {
      type: Number,
      default: 0
    },
    "Occupation": String,
    "Company": String
});
var Work = employee;
var employee2 = new Work({
    Name: "Sarah",
    Age: 32,
    Occupation: "Manager",
    Company: "TD"
});
var employee3Schema = new Schema({
    "Name": {
        type: String,
        unique: true
      },
    "Age": {
      type: Number,
      default: 0
    },
    "Occupation": String,
    "Company": String
});
var Business = Work;
var employee3 = new Business({
    Name: "Charles",
    Age: 28,
    Occupation: "Programmer",
    Company: "IUK Web Team"
});


employee.deleteMany({Name: "John"})
  .exec()
  .then(() => {
      console.log("removed employee");
  })
  .catch((err) => {
      console.log(err);
});
// save the company
employee1.save((err) => {
  if(err) {
    console.log(`There was an error saving the employee 1 information: ${err}`);
  } else {
    console.log("The employee was saved to the web322_companies collection");
  }
  employee.find({ Name: "John" })
  .exec()
  .then((employee1) => {
    if(!employee1) {
      console.log("No employee was found");
    } else {
      console.log(employee1);
    }
    // exit the program after saving
    process.exit();
  })
  .catch((err) => {
    console.log(`There was an error: ${err}`);
  });
});


employee2.save((err) => {
  if(err) {
    console.log(`There was an error saving the employee 2 information: ${err}`);
  } else {
    console.log("Walmart company was saved to the web322_companies collection");
  }

  Work.find({ Name: "Sarah" })
  .exec()
  .then((employee2) => {
    if(!employee2) {
      console.log("No employee was found");
    } else {
      console.log(employee2);
    }
    // exit the program after saving
    process.exit();
  })
  .catch((err) => {
    console.log(`There was an error: ${err}`);
  });
});

employee3.save((err) => {
  if(err) {
    console.log(`There was an error saving the employee 3 information: ${err}`);
  } else {
    console.log("The employee information was saved to the web322_companies collection");
  }
  Business.find({ Name: "Charles" })
  .exec()
  .then((employee3) => {
    if(!employee3) {
      console.log("No employee was found");
    } else {
      console.log(employee3);
    }
    // exit the program after saving
    process.exit();
  })
  .catch((err) => {
    console.log(`There was an error: ${err}`);
  });
});
*/
