// Create a function to
// handle route-specific
// requests.
exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
};

// Log the request's body
exports.sendPost = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
}