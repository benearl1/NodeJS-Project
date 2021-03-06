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
    res.send("Basic Page<br /><a href='/about'>Go to the about page</a><br /><a href='/employeeInfo'>View Employees</a><br /><a href='/test'>View Test</a><br /><a href='/default'>View Default Layout</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employeeInfo", function(req,res){

    var someData = [{
        name: "John",
        age: 23,
        occupation: "Developer",
        company: "The Kwik-E-Mart"
    },
    {
        name: "Sarah",
        age: 32,
        occupation: "Manager",
        company: "Walmart"
    },
    {
        name: "Charles",
        age: 28,
        occupation: "Programmer",
        company: "Google"
    }];

    res.render('viewData', {
        data: someData,
        //layout: false // do not use the default Layout (main.hbs)
    });

});

app.get("/test", function(req,res){

    var someMoreData = [{
        name: "test",
        age: 1,
        occupation: "test",
        company: "test"
    },
    {
        name: "test2",
        age: 2,
        occupation: "test2",
        company: "test2"
    }];

    res.render('viewData', {
        data: someMoreData,
        //layout: false // do not use the default Layout (main.hbs)
    });

});

app.get("/default", function(req,res){

    var someMoreData = [{
        
    }];

    res.render('viewData', {
        data: someMoreData,
        //layout: false // do not use the default Layout (main.hbs)
    });

});

// start the server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);