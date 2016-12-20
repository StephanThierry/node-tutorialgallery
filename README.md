# node-tutorialgallery
Barebones NodeJS project for new developers. A "working" app designed to offer some base functionality and a lot of room for improvement.

In local "\Server" folder, run "npm install" to recreate depencencies and then "node ./galleryServer.js" to start the server.

By default, the server is listening to port 3000. If no other webserver is running on the machine, this could be changed to port 80.

Static files from local "./Client" folder are exposed to "/" (root) so "index.html" is available directly at "http://localhost:3000"

The "/Server/galleries/" folder is exposed on "http://localhost:3000/galleries"

