var menuListDao = require('../../dao/menu-list');

module.exports = function(req, res, next) {
    var where = req.body.where;
    menuListDao.queryCount(where).then(data => {
        var result = {
            data: data || 1
        };
        res.write(JSON.stringify(result));
        res.end();
    });
};