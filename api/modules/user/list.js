var userDao = require('../../dao/user-list');

module.exports = function(req, res, next) {
    var pager = req.body.pager;
    var where = req.body.condition;
    userDao.queryList(where, pager).then(data => {
        var result = {
            data: data || []
        };
        res.json(result);
    });
};