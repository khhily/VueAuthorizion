var express = require("express");
var router = express.Router();
var checkLogin = require("../modules/user/checklogin");

router.post('/user/checklogin', checkLogin);
router.post('/user/login', require("../modules/user/login"));
router.post('/user/menus', require("../modules/user/menus"));

module.exports = router;