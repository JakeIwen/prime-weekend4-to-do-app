var express = require("express");
var app = express();
var index = require('./routes/index');
var tasks = require('./modules/tasks');
var bodyParser = require('body-parser');
var path = require('path');
var port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/tasks', tasks);


app.use(express.static('./public/scripts'));
app.use(express.static('./public/vendor'));
app.use(express.static('./public/styles'));



app.listen(process.env.PORT || port);

app.get('/', index);
console.log("Listening on port: ", port);
