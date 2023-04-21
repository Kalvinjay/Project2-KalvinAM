const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/manifest.json", function(req, res){
    res.header("Content-Type", "text/cache-manifest");
    res.sendFile(path.join(__dirname, "manifest.json"));
  });
  
  app.get("/sw.js", function(req, res){
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "sw.js"));
  });
  
  app.get("/loader.js", function(req, res){
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "loader.js"));
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

module.exports = app;