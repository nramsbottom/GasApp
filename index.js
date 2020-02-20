var express = require('express');
var http = require('http');
var app = express();
var helmet = require('helmet')
var api = require('./api')

app.use(helmet())
app.use(express.static('public'));
app.use('/api', api);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

var port = process.env.PORT || 8080;

http.createServer(app).listen(port);
