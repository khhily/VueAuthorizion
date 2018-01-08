var menuListDao = require('../../dao/menu-list');

module.exports = function(req, res, next) {
    var pager = req.pager;
    menuListDao.queryCount(null).then(data => {
        var result = {
            data: data || 1
        };
        res.write(JSON.stringify(result));
        res.end();
    });
};