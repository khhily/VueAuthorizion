var menuListDao = require('../../dao/menu-list');

module.exports = function (req, res, next) {
    var id = req.body.id;
    if (id) {
        var where = {
            _id: id
        };
        if (where) {
            menuListDao.remove(where).then(data => {
                res.end();
            });
        } else {
            res.end();
        }
    } else {
        var result = {
            trans: {
                errorCode: 500,
                errorMessage: '数据未提交'
            }
        };
        res.end(JSON.stringify(result));
    }
}