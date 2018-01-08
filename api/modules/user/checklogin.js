var redisHelper = require("../../common/redis-helper");

module.exports = function(req, res, next) {
    console.log("check login");
    if(req.headers && req.headers["token"]) {
        var token = req.headers["token"];
        redisHelper.get(token).then(data => {
            var result = { data: true };
            if(!data) {
                result.data = false;
            }
            res.end(JSON.stringify(result));
        });
    } else {
        res.end(JSON.stringify({data: false}));
    }
};