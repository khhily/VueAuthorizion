var userListDao = require('../../dao/user-list');

module.exports = function(req, res, next) {
    var where = req.body.where;
    userListDao.queryCount(where).then(data => {
        var result = {
            data: data || 1
        };
        res.json(result);
    });
};