const port = 3000;

// Add express module to application.
const express = require("express");

// Initialize Express in app variable
const app = express();

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: false
    })
);

// Data will be parsed to JSON
app.use(express.json());

// Log the request's body
app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});


// Handle POST request for "/contact"
// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
// });

// Respond with path parameters.
app.get("/items/:vegetable", (req, res) => {
    let veg = req.params.vegetable
    res.send(`This page is for ${veg}🥕`);
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});