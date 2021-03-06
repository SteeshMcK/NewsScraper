const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// assigning PORT to the host's designated port OR 3000
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Express Router
const router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

/*To serve static files such as images, CSS files, 
and JavaScript files, use the express.static built-in 
middleware function in Express.*/
app.use(express.static(__dirname + "/public"));

// Use bodyParser in app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Connect Handlebars to Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Every request will go through the router middleware
app.use(router);

// If deployed, use the deployed database OR use local mongoHead database
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

// Connect mongoose to the database
mongoose.connect(db, {useNewUrlParser: true}, function(error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});


// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});









