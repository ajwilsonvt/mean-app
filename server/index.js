var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var _ = require("lodash");

//create the application
var app = express();

/*start middleware (software that bridges an OS and a database) necessary
for REST APIs. REST stands for representational state transfer - an
architectural style of web dev used for fast performance*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
    /*add CORS (cross-origin resource sharing) support for RESTful interfaces.
    CORS lets you share restricted resources, like fonts, with an outside
    domain. Expose our APIs to all URLs accessing our servers = "public API"*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
//end middleware

/*Hello World code
this tells Express.js (framework for Node.js) that at URL /hello, call
function() and pass me the request, a response object & give me ability to
call next() to move on to next middleware. Have to call next() or else
browser hangs.
    app.use("/hello", function(req, res, next) {
        res.send("Hello World!");
        next();
    });*/

//connect to MongoDB
mongoose.connect("mongodb://localhost/mean-app");
mongoose.connection.once("open", function() {
    //load the models
    app.models = require("./models/index");
        /*assigned to app so it can be "dependency-injected into controllers"
        "controllers have access to all models, but models know nothing about
        controllers. this is good MVC (model-view-controller) separation"*/

    //load the routes
    var routes = require("./routes");
    _.each(routes, function(controller, route) {
        /*each iterates over all the routes by assigning value of controller
        as first argument in the callback function, and the key (the route) as
        the second argument in the callback*/

        app.use(route, controller(app, route));
});

    console.log("Listening on port 3000...");
    app.listen(3000);
});
