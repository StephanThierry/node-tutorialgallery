// To install dependencies use "npm install"
// To start use "node galleryServer.js"

// Express is the webserver package
// All packages are stored in the "node_modules" folder below the current folder
var express = require("express");

/*
 Start the Express constructor method my calling express()
 Store the resulting instance in the variable app
 from this point all Express functions can be called using "app.functionname()"
*/
var app = express();

/*
 Cors is a plugin for Express - it enables "Cross-origin resource sharing"
 This is required if the server is hosted on a different domain (or subdomain)
 than the clientfiles. So forexmple the sever is mapped to "rest.mydomain.com"
 and the client is mapped to "www.mydomain.com". In this case an AJAX call
 from a client hosted on "www.mydomain.com" would fail with the message
 “No 'Access-Control-Allow-Origin' header is present on the requested resource”
 The cors middleware sets this header so Cross-origin requests are allowed.
*/
var cors = require('cors')

/*
  Here we call the "use" function on the instance of Express (stored in the
  variable app) to enable Express to use the cors middleware from here on.
*/
app.use(cors());

// The fs package is used to enable access to the filesystem
var fs = require('fs');

/*
 The path package includes a lot of functions that make it easy to handle
 filepath and filetypes. Specifically we use path.join to add a path and a
 filename, string.isDirectory() to determine if the content of a string is a valid
 directory and string.isFile() to determine if the content of a string is a valid
 filename. It's not possible from a string to know for sure if something is a
 file (without extention) or a directory (that can contain ".") easy to imagine
 a string "c:\whatever". Without access to the filesystem it would be impossible
 to determine if it was a directory or a file without extention.
*/
var path = require('path');

const galleryFolder = "galleries";
const clientFolder = "../client";

app.use("/" + galleryFolder, express.static(galleryFolder))
app.use(express.static(clientFolder))

app.get("/galleryindex", function (req, res) {
    var galleryIndex = getGalleries();

    res.send(galleryIndex);
});

app.get("/gallery", function (req, res) {
  var id = parseInt(req.query.id);
  res.send(getGallery(id));
});

// Returnerer et Array af strings der indeholder de mapper der ligger under mappen "galleries"
function getGalleries() {
  var srcpath = galleryFolder;
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getGallery(index) {
  var srcpath = galleryFolder + "/" + getGalleries()[index];
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

var port = 3000;
console.log("Server listening on localhost:" + port);
app.listen(port);
