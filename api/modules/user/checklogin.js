var redisHelper = require("../../common/redis-helper");

module.exports = function(req, res, next) {
    console.log("check login");
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
            //res.end(JSON.stringify(result));
        });
    } else {
        res.end(JSON.stringify({data: false}));
    }
};