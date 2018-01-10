var bufferHelper = require("./buffer-helper");
var http = require("http");

module.exports = function (req, res, next) {
    var reqPath = req.url;
    //reqPath = reqPath.substring(4);
    var uiHeaders = req.headers;
    var headers = uiHeaders;
    if(!headers) {
        headers = {};
    }
    headers["Content-Type"] = "application/json";
    if (headers["content-length"]) {
        delete headers["content-length"];
    }
    var option = {
        path: reqPath,
        host: 'localhost',
        port: 10500,
        method: 'post',
        headers: headers
    };
    console.log(option.headers.token);
    var api_req = http.request(option, function(api_res) {
        var buffers = [];
        api_res.on('data', function(chunk){
            buffers.push(chunk);
        });
        api_res.on('end', function() {
            var buffer = bufferHelper.mergeBuffers(buffers);
            var responseStr = buffer.toString();
            var res_data;
            if(responseStr) {
                res_data = JSON.parse(responseStr);
            }
            var result = {};
            if(res_data) {
                result.data = res_data.data;
            }
            console.log("request url : " + reqPath);
            res.end(JSON.stringify(result));
        });
        api_res.on('error', function(err) {
            var result = {
                trans: {
                    errorCode: err.status,
                    errorMessage: err.message
                }
            };
            res.end(JSON.stringify(result));
        })
    });
    api_req.on('error', function(err) {
        var result = {
            trans: {
                errorCode: err.status,
                errorMessage: err.message
            }
        };
        res.end(JSON.stringify(result));
    });
    if(req.body) {
        api_req.write(JSON.stringify(req.body));
    }
    api_req.end();
}