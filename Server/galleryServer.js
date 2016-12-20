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

/*
 "const" is a constant it behaves the same as "var" except the value can't
  be changed while the program is running. We may as well have used "var" but
  using "const" we explain that the value should be set once and not be changed
  The constant galleryFolder is used to store the name of the folder that contains
  all galleries. Meaning in this case "Server/galleries" since the server is
  running in the "Server" folder
*/
const galleryFolder = "galleries";

/*
 This variable contains the path to the Client files. It's possible to serve the
 clientfiles via a different webserver but since Express does this very easily
 it's not nessecary. However, if for some reason the Client port can't be mapped
 to port 80 using another webserver should be used.

 The starting "../" means "Go back one level" - since the server is running
 inside the /Server folder, we need to go back one level to access "Client"
*/
const clientFolder = "../Client";

/*
 This line calls express.static as Express middleware and takes clientFolder
 as input thereby exposing all files in the clientFolder to webrequests.
 When calling app.use() with express.static() as a parameter and no other
 parameters, Express assumes "/" (root). So the content of clientFolder is
 available from the root. For example. "http://localhost:3000/index.html"
*/
app.use(express.static(clientFolder))

/*
 Here we are making the same call to app.use() and passing express.static() as
 a parameter. But in this case we also send in a string "/" +galleryFolder.
 resulting in "/galleries". This means we expose the galleryFolder
 "galleries" meaning "./Server/galleries" (since we are already inside the
 "Server" folder). When we include the string "/galleries" the serverfolder
 is the exposed on that serverpath meaning "http://localhost:3000/galleries"
*/
app.use("/" + galleryFolder, express.static(galleryFolder))


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
