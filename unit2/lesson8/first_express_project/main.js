const port = 3000;

// Add express module to application.
const express = require("express");

// Initialize Express in app variable
const app = express();

// Set up GET route for "/"
app.get("/", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.send("Hello, Universe!");
})

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});