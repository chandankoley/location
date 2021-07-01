var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PORT_NO = process.env.PORT || 8000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', require('./api'));


var server = app.listen(PORT_NO, function () {
    console.log('Server is running on port no:', PORT_NO);
});