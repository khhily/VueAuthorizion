var menuListDao = require("../../dao/menu-list");

module.exports = function(req, res, next) {
    menuListDao.queryList().then(data => {
        res.write(JSON.stringify({data: data}));
    }, err => {
        res.write(JSON.stringify(err));
    }).finally(() => {
        res.end();
    });
    // var menus = [
    //     {
    //         id:1,
    //         path: '/base',
    //         display: '首页'
    //     },
    //     {
    //         id: 2,
    //         display: '基本信息',
    //         children: [{
    //             id: 3,
    //             display: '角色管理',
    //             path: '/base/role'
    //         }, {
    //             id: 4,
    //             display: '用户管理',
    //             path: '/base/user'
    //         }]
    //     }
    // ];
};