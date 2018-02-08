var redisHelper = require("../../common/redis-helper");

module.exports = function(req, res, next) {
    if(req.headers && req.headers["token"]) {
        var token = req.headers["token"];
        redisHelper.get(token).then(data => {
            var result = { data: data };
            if(!data) {
                result.data = null;
            }
            if(result.data) {
                result.data = JSON.parse(result.data);
                redisHelper.refresh(token);
            }
            res.json(result);
        });
    } else {
        res.json({data: false});
    }
};