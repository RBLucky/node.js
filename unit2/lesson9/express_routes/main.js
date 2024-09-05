const port = 3000;

// Add express module to application.
const express = require("express");

// Initialize Express in app variable
const app = express();

// Set up POST route for "/contact"
app.post("/contact", (req, res) => {
    res.send("Contact information submitted successfully.");
});

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});