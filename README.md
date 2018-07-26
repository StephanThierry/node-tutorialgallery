# node-tutorialgallery
Barebones NodeJS project for new NodeJS developers. A "working" app designed to offer some base functionality and a lot of room for improvement.

The faetures or look of the app is not important - it simply shows an ugly page with some pictures. The important part of the project is the code-comments that explain the meaning behind most of the lines in the NodeJS backend.

## Some of the concepts explained
What is "require"?  
What is Express?  
What is Cors middelware? (...and why should I care)    
How do I access the filesystem in NodeJS?  
That is const and var?  
How do I serve static web content (files)?  
What are QueryString parameters and how do I use them?   



## How to run
In local "\Server" folder, run "npm install" to recreate depencencies and then "node ./galleryServer.js" to start the server.

By default, the server is listening to port 3000. If no other webserver is running on the machine, this could be changed to port 80.

Static files from local "./Client" folder are exposed to "/" (root) so "index.html" is available directly at "http://localhost:3000"

The "/Server/galleries/" folder is exposed on "http://localhost:3000/galleries"

