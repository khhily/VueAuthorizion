var menuListDao = require('../../dao/menu-list');

module.exports = function(req, res, next) {
    var where = req.body.id;
    menuListDao.getone(where).then(data => {
        var result = {
            data: data || {}
        };
        res.write(JSON.stringify(result));
        res.end();
    });
};