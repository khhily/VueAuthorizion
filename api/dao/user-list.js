var mongodbHelper = require("../common/mongodb-helper");
var q = require("q");
var table = "user-list";

module.exports.getUserByUsernameAndPwd = function (username, pwd) {
    var defer = q.defer();
    var where = {
        username: username,
        password: pwd
    };
    mongodbHelper.first(table, where).then(data => {
        defer.resolve(data);
    }, err => {
        defer.reject(err);
    });
    return defer.promise;
};