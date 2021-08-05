const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const basicAuth = require('./auth'); 


app.use(basicAuth);

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/public'));

// send the user to index html page inspite of the url
app.get(['/','/*'],function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html')); 
 });
 
 app.get('/main.js',function(req,res){
     res.sendFile(path.join(__dirname + '/main.js')); 
 });

app.listen(port);

console.log('express server started at port', port);