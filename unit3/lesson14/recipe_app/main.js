const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const MongoDB = require("mongodb").MongoClient;

const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

// database connection
MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error;

    let db = client.db(dbName); //recipe_db
    console.log(`Successfully connected to ${dbName}`);

    // insert into our collection
    db.collection("contacts")
    .insert({
        name: "Test2",
        email: "test@email.com"
    }, (error, db) => {
        if (error) throw error;
        console.log(db);
    });

    db.collection("contacts")
    .insert({
        name: "Brian May",
        email: "brian@queen.com"
    }, (error, db) => {
        if (error) throw error;
        console.log(db);
    });

    // find contacts & print to console as array
    db.collection("contacts")
    .find()
    .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
    });
});


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

