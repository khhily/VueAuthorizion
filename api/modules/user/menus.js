var menuListDao = require("../../dao/menu-list");

var handleListToTree = function (arrays, parentId) {
    var roots = arrays.filter(function (item, index) {
        if (!parentId && !item.pId) {
            return true;
        }
        if (parentId && item.pId == parentId) {
            return true;
        }

        return false;
    });
    if (roots.length > 0) {
        for (var i = 0; i < roots.length; i++) {
            var subs = handleListToTree(arrays, roots[i]._id);
            if(subs.length > 0) {
                roots[i].children = subs;
            }
        }
    }
    return roots;
}

module.exports = function(req, res, next) {
    menuListDao.queryList().then(data => {
        var tree = handleListToTree(data, '');
        res.json({data: tree});
    }, err => {
        res.json(err);
    });
};