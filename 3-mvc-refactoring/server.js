const express = require('express');
const app = express();
const http = require('http').Server(app);
const todoJSON = require('./todo.json');

app.use(express.static(__dirname + ''));


app.get('/', function(req, res) {
  res.sendfile('todomvc.html');
});
app.get('/todo', function(req, res) {
  res.json(todoJSON);
});


http.listen(2018, function() {
  console.log('listening on *:2018', '\n' + __dirname);
});