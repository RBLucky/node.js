const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// Set up the connection
// to your database.
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
{useNewUrlParser: true}
);


// Assign the database
// to the db variable.
const db = mongoose.connection;


// Log a message when the
// application connects to
// the database.
db.once("open", () => {
    console.log("Succesfully connected to MongoDB using Mongoose!");
});


/* 

MODELS - In Models Module
// Create a new schema
// with mongoose.Schema.
const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number // Add schema properties.
});

// Apply Model
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

*/


// middleware configuration
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

// handling requests
// app.get("/name", homeController.respondWithName);
app.get("/name/:myName", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});

//app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

