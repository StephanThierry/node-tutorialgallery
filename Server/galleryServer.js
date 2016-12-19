// To install use "npm install express --save"
var express = require("express");
var app = express();

var cors = require('cors')
app.use(cors());

var fs = require('fs');
var path = require('path');

const galleryFoleder = "galleries";
const clientFolder = "../client";
app.use("/" + galleryFoleder, express.static(galleryFoleder))
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
  var srcpath = galleryFoleder;
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getGallery(index) {
  var srcpath = galleryFoleder + "/" + getGalleries()[index];
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

var port = 3000;
console.log("Server listening on localhost:" + port);
app.listen(port);
