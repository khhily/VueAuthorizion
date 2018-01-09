var express = require("express");
var router = express.Router();

router.post('/user/checklogin', require("../modules/user/checklogin"));
router.post('/user/login', require("../modules/user/login"));
router.post('/user/menus', require("../modules/user/menus"));
router.post('/menu/list', require("../modules/menu/list"));
router.post('/menu/count', require("../modules/menu/count"));

module.exports = router;