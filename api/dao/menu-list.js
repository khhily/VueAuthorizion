var q = require("q");
var mongoHelper = require("../common/mongodb-helper");
var ObjectId = require('mongodb').ObjectID;
var table = "menu-list";

module.exports.queryList = function(where, pager) {
    var defer = q.defer();
    if(!pager) {
        pager = {
            currentPage: 1,
            pageSize: 15
        };
    }
    mongoHelper.select(table, where, pager).then(data => {
        defer.resolve(data);
    }, err =>{
        defer.reject(err);
    });

    return defer.promise;
};

module.exports.queryCount = function(where) {
    var defer = q.defer();
    mongoHelper.count(table, where).then(data => {
        defer.resolve(data);
    }, err =>{
        defer.reject(err);
    });

    return defer.promise;
};

module.exports.insert = function(model) {
    var defer = q.defer();

    mongoHelper.insert(table, model).then(data => {
        defer.resolve(data);
    }, err => {
        defer.reject(err);
    });

    return defer.promise;
};

module.exports.getone = function(id) {
    var defer = q.defer();
    mongoHelper.first(table, {_id: ObjectId(id)}).then(data => {
        defer.resolve(data);
    }, err => {
        defer.reject(err);
    });
    return defer.promise;
};

module.exports.update = function(saveModel) {
    var defer = q.defer();
    mongoHelper.update(table, saveModel, {_id: ObjectId(saveModel.id)}).then(data => {
        defer.resolve(data);
    }, err => {
        defer.reject(err);
    });
    return defer.promise;
}