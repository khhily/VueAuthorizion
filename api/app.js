var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router/router");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', router);

var server = app.listen(10500, () => {
    var address = server.address().address;
    var port = server.address().port;
    console.log('api is running at ' + address + ':' + port);
});