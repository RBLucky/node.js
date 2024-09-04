const httpStatus = require("http-status-codes");

// Define a routes object to
// store routes mapped to
// POST and GET requests.
const htmlContentType = {
    "Content-Type": "text/html"
}

const routes = {
    "GET": {
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/plain"
            })
            res.end("Welcome to the Info Page!")
        }
    },
    'POST': {}
};


// Create a function called
// handle to process route
// callback functions.
exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        console.log("error: " + ex);
    }
};


// Build get and post
// functions to register
// routes from main.js.
exports.get = (url, action) => {
    routes["GET"][url] = action;
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};