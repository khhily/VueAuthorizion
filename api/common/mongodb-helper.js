var collectionName = 'vue-authority';
var connectionString = 'mongodb://localhost:27017/test';
var MongoClient = require("mongodb").MongoClient;
var q = require("q");

var insertData = function (db, table, value) {
    var defer = q.defer();

    var collection = db.collection(table);
    collection.insert(value, function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(true);
        }
    });

    return defer.promise;
};

var searchData = function (db, table, where) {
    var defer = q.defer();

    var collection = db.collection(table);

    collection.find(where).toArray(function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
};

var searchDataWithPager = function (db, table, where, pager) {
    var defer = q.defer();

    var collection = db.collection(table);

    collection.find(where).limit(pager.pageSize).skip((pager.currentPage - 1) * pager.pageSize).toArray(function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

var searchOne = function (db, table, where) {
    var defer = q.defer();
    var collection = db.collection(table);
    collection.findOne(where, function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
};

var updateData = function (db, table, value, where) {
    var defer = q.defer();

    var collection = db.collection(table);
    var updateStr = {
        $set: value
    };
    collection.update(where, updateStr, function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(true);
        }
    });
    return defer.promise;
};

var deleteData = function (db, table, where) {
    var defer = q.defer();
    var collection = db.collection(table);
    collection.remove(where, function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(true);
        }
    });
    return defer.promise;
};

module.exports.insert = function (table, value) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        insertData(dbase, table, value).then(data => {
            if (data) {
                defer.resolve(data);
            } else {
                defer.resolve(false);
            }
        }, err => {
            defer.reject(JSON.stringify(err));
        }).finally(() => {
            db.close();
        });
    });
    return defer.promise;
};
module.exports.update = function (table, value, where) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        updateData(dbase, table, value, where).then(data => {
            if (data) {
                defer.resolve(data);
            } else {
                defer.resolve(false);
            }
        }, err => {
            defer.reject(JSON.stringify(err));
        }).finally(() => {
            db.close();
        });
    });
    return defer.promise;
};

module.exports.select = function (table, where, pager) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        if (!pager) {
            searchData(dbase, table, where).then(data => {
                if (data) {
                    defer.resolve(data);
                } else {
                    defer.resolve([]);
                }
            }, err => {
                defer.reject(JSON.stringify(err));
            }).finally(() => {
                db.close();
            });
        } else {
            searchDataWithPager(dbase, table, where, pager).then(data => {
                if (data) {
                    data = [];
                }
                defer.resolve(data);
            }, err => {
                defer.reject(err);
            }).finally(() => {
                db.close();
            })
        }
    });
    return defer.promise;
};

module.exports.count = function (table, where) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        var collection = dbase.collection(table);
        collection.find(where).count(function(err, result) {
            if(err) {
                defer.reject(err);
                db.close();
                return;
            }
            defer.resolve(result);
            db.close();
        });
    });
    return defer.promise;
};

module.exports.first = function (table, where) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        searchOne(dbase, table, where).then(data => {
            if (data) {
                defer.resolve(data);
            } else {
                defer.resolve(null);
            }
        }, err => {
            defer.reject(JSON.stringify(err));
        }).finally(() => {
            db.close();
        });
    });
    return defer.promise;
};

module.exports.delete = function (table, where) {
    var defer = q.defer();
    MongoClient.connect(connectionString, function (err, db) {
        var dbase = db.db('test');
        if (err) {
            defer.reject(err);
            db.close();
            return;
        }
        deleteData(dbase, table, where).then(data => {
            if (data) {
                defer.resolve(data);
            } else {
                defer.resolve(false);
            }
        }, err => {
            defer.reject(JSON.stringify(err));
        }).finally(() => {
            db.close();
        });
    });
    return defer.promise;
};