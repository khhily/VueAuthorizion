var q = require("q");
var mongoHelper = require("../common/mongodb-helper");
var table = "menu-list";

module.exports.queryList = function(where, pager) {
    var defer = q.defer();
    if(!pager) {
        pager = {
            currentPage: 1,
            pageSize: 15
        };
    }
    mongoHelper.select(table, pager).then(data => {
        defer.resolve(data);
    }, err =>{
        defer.reject(err);
    });

    return defer.promise;
};

module.exports.queryCount = function(where) {
    var defer = q.defer();
    if(!pager) {
        pager = {
            currentPage: 1,
            pageSize: 15
        };
    }
    mongoHelper.select(table, pager).then(data => {
        defer.resolve(data);
    }, err =>{
        defer.reject(err);
    });

    return defer.promise;
}