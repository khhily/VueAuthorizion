var menuListDao = require('../../dao/menu-list');

module.exports = function (req, res, next) {
    var model = req.body.data;
    if (model) {
        var saveModel = {
            path: model.path,
            display: model.display,
            pId: model.pId || '',
            id: model._id
        };
        if (!saveModel.id) {
            menuListDao.insert(saveModel).then(data => {
                res.json(data);
            });
        } else {
            menuListDao.update(saveModel).then(data => {
                res.json(data);
            });
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