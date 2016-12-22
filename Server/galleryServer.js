// To install dependencies use "npm install"
// To start use "node galleryServer.js"

/*
 The "require" function is used to load external modules. 
 In this case we use the popular webserver package Express. It was originally 
 installed using the command "npm install express --save"
 Using the "--save" parameter when installing npm modules ensures
 that the dependency is saved inside the file "package.json". 
 If a project does not have a "package.json" file one can be auto-created
 using the "npm init" command.
 When information about all external packages (modules) are saved in
 this way it's easy to move the project from one system to another without
 copying modules that are basically downloadable content. 
 This is also the reason they are not included in this repo, but are specified
 in the ".gitignore" file to be ignored by git during push. The "npm install" 
 command (with no other parameters) is used to recreate all required dependencies. 
 All packages are stored in the "node_modules" folder below the current folder.

 A variable called express is defined and the object the package exports
 is loaded into it. This gives us acccess to the express server via the 
 express variable. We could have given it a different name like "webserver"
 but we will use the name express since it is the name most commonly used. 
*/
var express = require("express");

/*
 Start the Express constructor function my calling express()
 Store the resulting instance in the variable app.
 From this point all Express functions can be called using "app.somefunctionname()"
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
  variable app) this makes Express use the cors module. Modules that add
  functionality to Express is called "middleware".

  If you are accessing the server from the same domain, you can comment out
  this line using //. This goes for the "require('cors')" statement.
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
 "const" is a constant. It behaves the same as "var" except the value can't
  be changed while the program is running. We may as well have used "var" but by
  using "const" we explain that the value should be set once and not be changed.
  The constant settings is an object that contains 2 values.
  
  Side-note: const should not be used in client-side javascript that is loaded in the 
  browser since not all browsers support it. On the server side however we only 
  have to worry about one variation of JavaScript since it will only be interpreted 
  by the NodeJS runtime.

  galleryFolder is used to store the name of the folder that contains
  all galleries. Meaning in this case "Server/galleries" since the server is
  running in the "Server" folder.
  It's accessed using: settings.galleryFolder

  clientFolder contains the path to the Client files. It's possible to serve the
  clientfiles via a different webserver but since Express does this very easily
  it's not nessecary. However, if for some reason the Client port can't be mapped
  to port 80, another webserver should be used.

  If a custom port is used the person using the website is required to specify
  that port in the URL like so: "http://mydomain.com:3000" (if the port number
  being used is 3000) but since port 80 is default it's not required, leaving
  the website with a more userfriendly URL "http://mydomain.com"

  The starting "../" in the clientFolder string means "Go back (up) one level in
  the folder structure". Since the server is running inside the /Server folder,
  we need to go up one level to access "Client"
*/
const settings = { galleryFolder : "galleries",
                  clientFolder : "../Client"};

/*
 This line calls express.static as Express middleware and takes clientFolder
 as input thereby exposing all files in the clientFolder to webrequests.
 When calling app.use() with express.static() as a parameter and no other
 parameters, Express assumes "/" (root). So the content of clientFolder is
 available from the root. For example. "http://localhost:3000/index.html"
*/
app.use(express.static(settings.clientFolder))

/*
 Here we are making the same call to app.use() and passing express.static() as
 a parameter. But in this case we also send in a string:
 "/" + settings.galleryFolder. Resulting in "/galleries". This means we expose
 the galleryFolder "galleries" meaning "./Server/galleries" (since we are already
 inside the "Server" folder). When we include the string "/galleries" the
 serverfolder is then exposed on that server route meaning:
 "http://localhost:3000/galleries"

 Route and path are two sides of the same concept. In this context
 Path refers to a path in the physical filestructure: "c:\myfile\mydocs" and
 route defines a web-route "http://domain.com/route"

 This statement is the bridge between the two. Between a physical filestructure
 path and its web-route. In this case both are the same, therefore the
 settings.galleryFolder value is used i both cases, but it would be easy to change
 them independently. If we wanted to give the local filestructure folder
 "/Server/galleries" a web-route: "/pictures" (http://domain.com/pictures).
 Simply change the statement below to:
 app.use("/pictures", express.static(settings.galleryFolder))
*/
app.use("/" + settings.galleryFolder, express.static(settings.galleryFolder))

/*
 Here we call app.get() "GET" is the name of a request-type that contains no
 data. This type of request-type name is called a "HTTP verb". There are a
 number of different HTTP verbs, but the main ones are "GET" and "POST".
 GET is a simple page request, and POST is when the user sends data back
 to the server.

 So for example then you type "http://google.com" your browser makes a
 GET-request to google.com.

 POST-reqests are used, for example, when entering login information and hitting
 the "Login" button. Since that requires data from the client to the server it's
 usually done with a POST request. Other examples of POST request are uploading
 files, filling out forms and so on.

 The first paramenter in the call is a string "/galleryindex". This means "what
 route should this code handle the request to." So the route combined with the
 HTTP verb gives us the whole picture: "When a user makes a simple request
 to "http://localhost:3000/galleryindex" execute the following code."

 The second parameter is a function that takes 2 parameters (request, response).
 In this implementation an anonymous function is used "function (req, res)" as
 we don't need any information from the request the "req" paramenter (variable)
 is not used.

 The "res" (response) paramenter/vaiable is used to send the response we want
 the client. For this we use the function send() on the res-object. So res.send();

 In this case we send the string Array af galliers contained in galleryIndex
 to the client. The resulting output is: ["Backgrounds","Clipart"]

 The [] signifies that it's an Array, and inside the Array each string is
 surrounded with "".
 */
app.get("/galleryindex", function (req, res) {
    // Define a variable galleryIndex. Take the output of the function
    // getGalleries() and assign it to the vaiable. The function returns an
    // Array of strings that contains all avaiable galleries - meaning all
    // folder names inside the galleryFolder ("galleries")
    var galleryIndex = getGalleries();

    // The res.send() function takes one paramenter. We used it to send the output
    // to the client. Look in the Client-code /Client/js/scripts.js on how the
    // data is processed.
    res.send(galleryIndex);
});

/*
 We specify whan happens when a GET request is made to
 "http://localhost:3000/gallery".
*/
app.get("/gallery", function (req, res) {
/*
  In this case we use the "req" variable to get the value of the QueryString
  paramenter "id". For example "http://localhost:3000/gallery?id=1"
  in this case the variable id would be the string "1". We use the built-in
  function parseInt() to convert the string "1" to the number 1.

  To "parse" something means to analyse that is confides to a particular
  syntax or gramma - and usually to then translate it to some other form. The
  translation always relies on the parsing to have been successful. In this
  case the string must be a number for the parsing to be successful. Any invalid
  input would result in id becoming the JavaScript constant "NaN" (Not A Number).

  But since no end-user will be calling this endpoint, we assume "id" is always
  a valid number.
  */
  var id = parseInt(req.query.id);

/*
  We call res.send() as parameneter we use a call to getGallery() - and as a
 paramenter to that function we use the variable id that came from the
 request QueryString
*/
  res.send(getGallery(id));
});

// Returns an Array of strings containing the folder insiden the
// folder "galleries"
function getGalleries() {
  var srcpath = settings.galleryFolder;
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getGallery(index) {
  var srcpath = settings.galleryFolder + "/" + getGalleries()[index];
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

var port = 3000;
console.log("Server listening on localhost:" + port);
app.listen(port);
