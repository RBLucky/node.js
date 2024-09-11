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
    "mongodb://0.0.0.0:27017/recipe_db",
    { useNewUrlParser: true }
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

// Create then save (2-step method)
/*
let subscriber1 = new Subscriber({
    name: "Lucky Nkosi",
    email: "lucky@nkosi.com"
});

subscriber1.save((err, savedDoc) => {
    if (err) console.log(err);
    console.log(savedDoc);
});
*/

// Create and save (1-step method)
Subscriber.create(
    {
        name: "Lucky Nkosi",
        email: "lucky@nkosi.com"
    }
)
    .then(savedDocument => {
        console.log(savedDocument);
    })
    .catch(error => {
        console.log(error);
    });


// Running a Query
let myQuery = Subscriber.findOne({
    name: "Lucky Nkosi"
}).exec();
myQuery
    .then(docs => {
        console.log(docs); // Handle the results
    })
    .catch(err => {
        console.error(err); // Handle errors
    });


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

