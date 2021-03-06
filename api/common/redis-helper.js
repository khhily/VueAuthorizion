var redis = require("redis");
var q = require("q");


var getConnect = function() {
    return redis.createClient(6379, '127.0.0.1');
}

var getValue = function (key) {
    var defer = q.defer();
    var client = getConnect();
    client.on('connect', function () {
        client.get(key, (err, reply) => {
            if (err) {
                defer.reject(err);
                return;
            }
            defer.resolve(reply);
        });
    });
    client.on('error', function (err) {
        defer.reject(JSON.stringify(err));
    });
    return defer.promise;
};

var setValue = function (key, val, expire) {
    var defer = q.defer();
    var client = getConnect();
    client.on('connect', function () {
        var value = '';
        if (typeof val === "object") {
            value = JSON.stringify(val);
        } else if (typeof val === "function") {
            value = '';
        } else {
            value = val;
        }
        client.set(key, value, (err, reply) => {
            if (err) {
                defer.reject(err);
                return;
            }
            defer.resolve(reply);
        });
        if(!expire) expire = 1800;//30分钟*60秒
        client.expire(key, expire);
    });
    client.on('error', function (err) {
        defer.reject(err);
    });
    return defer.promise;
};

var refreshTime = function(key, expire) {
    var defer = q.defer();
    var client = getConnect();
    client.on('connect', function () {
        if(!expire) expire = 1800;//30分钟*60秒
        client.expire(key, expire);
    });
    client.on('error', function (err) {
        defer.reject(err);
    });
    return defer.promise;
}

module.exports.get = getValue;
module.exports.set = setValue;
module.exports.refresh = refreshTime;