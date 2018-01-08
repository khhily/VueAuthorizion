var path = require("path");
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var apiHandler = require("./server/api-handler");

var staticPath = './dist';
app.set('PORT', 10300);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', apiHandler);

app.use('/node_modules', express.static(path.join(__dirname, "./node_modules/")));
app.use('/assets', express.static(path.join(__dirname, "./assets/")));
app.use('/', express.static(path.join(__dirname, staticPath)));
app.use('/src', express.static(path.join(__dirname, "./src")));

app.use('/', function (request, response, next) {
    var ext = path.extname(request.url);
    var extnames = ['.png', '.jpg', '.gif', '.css', '.js', '.ts', '.ico', '.html'];
    if (extnames.indexOf(ext) > 0) {
        response.end('Page is not exist');
        return;
    }

    response.sendFile(path.join(__dirname, staticPath, './index.html'), function (err) {
        if (err) {
            console.log(err);
            response.status(err.status).end();
        }
        console.log('url: ' + request.originalUrl);
    });
})

var server = http.createServer(app).listen(app.get("PORT"), () => {
    var addr = server.address().address;
    var port = server.address().port;
    console.log("Server is running at " + addr + ":" + port);
})