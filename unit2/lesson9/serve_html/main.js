const homeController = require("./controllers/homeController");

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

// Handle POST request for "/contact"
// app.post("/contact", (req, res) => {
//     res.send("Contact information submitted successfully.");
// });

// Respond with path parameters.
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", homeController.sendPost)

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});