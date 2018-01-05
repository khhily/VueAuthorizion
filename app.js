var path = require("path");
var http = require("http");
var express = require("express");
var app = express();
var redis = require("redis");
var uuid = require("node-uuid");

var staticPath = './dist';
app.set('PORT', 10300);

var getUser = function(req, cb) {
    if(req.headers)
    {
        var token = req.headers.token;
        if(token) {
            var client = redis.createClient(6379, '127.0.0.1');
            client.get(token, function(data) {
                var user = null;
                if(data) {
                    user = JSON.parse(data);
                }
                if(cb) {
                    cb(user);
                }
            });
            return;
        }
    }
    if(cb) {
        cb(null);
    }
}

var setUser = function(user) {
    //var redis_opt = {auth_pass:'wgx123456'};
    //var client = redis.createClient(6379, '127.0.0.1', redis_opt);
    var client = redis.createClient(6379, '127.0.0.1');
    // client.auth("wgx123456", function(){
    //     console.log("auth passed");
    // });
    var token = 'token:' + uuid.v4();
    var loginUser = client.set(token, JSON.stringify(user), (data) => {});
    return token;
}

app.use('/api', function (req, res, next) {
    var url = req.url;
    requestUrl = url.substring(4);
    if (requestUrl.endsWith('/user/login')) {
        var user = {
            username: 'wgx',
            isSuperAdmin: true,
        };
        var token = setUser(user);
        var result = {
            data: token
        };
        console.log('login success: ');
        console.log(result);
        res.end(JSON.stringify(result));
    }
    if (requestUrl.endsWith('/user/checklogin')) {
        getUser(req, function(user) {
            var result = {};
            if(user) {
                result.data = true;
            } else {
                result.data = false;
            }
            console.log(user);
            res.end(JSON.stringify(result));
        });
    }
});

app.use('/node_modules', express.static(path.join(__dirname, "/node_modules/")));
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

http.createServer(app).listen(app.get("PORT"), () => {
    console.log("Server is running at " + app.get("PORT"));
})