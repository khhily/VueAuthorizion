var menuListDao = require('../../dao/menu-list');

module.exports = function(req, res, next) {
    var pager = req.pager;
    menuListDao.queryList(null, pager).then(data => {
        var result = {
            data: data || []
        };
        res.write(JSON.stringify(result));
        res.end();
    });
};