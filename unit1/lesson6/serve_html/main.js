// 6.2 
// const port = 3000;
// const http = require("http");
// const httpStatus = require("http-status-codes");
// const fs = require("fs"); // Require the fs module.
// const routeMap = {
//     "/": "views/index.html"
// }; // Set up route mapping for HTML files.

// http.createServer((req, res) => {
//     res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//     });

//     // Read the contents
//     // of the mapped file.
//     if (routeMap[req.url]) {
//         fs.readFile(routeMap[req.url], (error, data) => {
//             res.write(data); // Respond with file contents.
//             res.end();
//         });
//     } else {
//         res.end("<h1>Sorry, not found.</h1>");
//     }
// }).listen(port);

// console.log(`The server has started and is listening on port number: ${port}`);

// 6.3
// const getViewUrl = (url) => {
//     return `views${url}.html`;
// };

// http.createServer((req, res) => {
//     let viewUrl = getViewUrl(req.url);
//     fs.readFile(viewUrl, (error, data) => {
//         if (error) {
//             res.writeHead(httpStatus.NOT_FOUND);
//             res.write("<h1>FILE NOT FOUND</h1>");
//         } else {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/html"
//             });
//             res.write(data);
//         }
//         res.end();
//     });
// }).listen(port);

// console.log(`The server has started and is listening on port number: ${port}`);


// 6.4
// const sendErrorResponse = res => {
//     res.writeHead(httpStatus.NOT_FOUND, {
//         "Content-Type": "text/html"
//     });
//     res.write("<h1>File Not Found!</h1>");
//     res.end();
// };

// http.createServer((req, res) => {
//     let url = req.url;
//     if (url.indexOf(".html") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/html"
//         });
//         customReadFile(`./views${url}`, res);
//     } else if (url.indexOf(".js") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/javascript"
//         });
//         customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf(".css") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "text/css"
//         });
//         customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf(".png") !== -1) {
//         res.writeHead(httpStatus.OK, {
//             "Content-Type": "image/png"
//         });
//         customReadFile(`./public/images${url}`, res);
//     } else {
//         sendErrorResponse(res);
//     }
// }).listen(3000);

// console.log(`The server is listening on port number: ${port}`);

// const customReadFile = (file_path, res) => {
//     if (fs.existsSync(file_path)) {
//         fs.readFile(file_path, (error, data) => {
//             if (error) {
//                 console.log(error);
//                 sendErrorResponse(res);
//                 return;
//             }
//             res.write(data);
//             res.end();
//         });
//     } else {
//         sendErrorResponse(res);
//     }
// };


// 6.6
const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");
const plainTextContentType = {
    "Content-Type": "text/plain"
}
const htmlContentType = {
    "Content-Type": "text/html"
}

// Create a custom
// readFile function to
// reduce code repetition.
const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        res.end(data);
    });
};

// Register routes with
// get and post.
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

// Handle all requests
// through router.js.
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);