var mongoHelper = require("./common/mongodb-helper");

mongoHelper.count('user-list', {username: 'admin'}).then(data => {
    console.log(data);
});
