var redisHelper = require("../../common/redis-helper");
var uuid = require("node-uuid");
var userListDao = require("../../dao/user-list");

module.exports = function(req, res, next) {
    if(req.body && req.body.data) {
        var loginUser = req.body.data;
        userListDao.getUserByUsernameAndPwd(loginUser.username, loginUser.password).then(data => {
            if(data) {
                var user = {
                    username: data.username,
                    isSuperAdmin: data.isSuperAdmin
                };
                var token = uuid.v4();
                redisHelper.set(token, user).then(data => {
                    res.end(JSON.stringify({data: token}));
                });
            } else {
                var result = {data: null};
                res.end(JSON.stringify(result));
            }
        }, err => {
            var result = {trans: {
                errorCode: 500,
                errorMessage: err
            }};
            res.end(err);
        });
    } else {
        var result = {
            trans: {
                errorCode: 500,
                errorMessage: '未接收到提交的数据'
            }
        };
        res.end(JSON.stringify(result));
    }
}