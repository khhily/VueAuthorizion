var menuListDao = require('../../dao/menu-list');

module.exports = function(req, res, next) {
    var pager = req.body.pager;
    var where = req.body.condition;
    if(!where["pid"]) {
        where.pId = {$in:[null, '']};
    } else {
        where.pId = where.pid;
    }
    delete where["pid"];
    menuListDao.queryList(where, pager).then(data => {
        var result = {
            data: data || []
        };
        res.write(JSON.stringify(result));
        res.end();
    });
};