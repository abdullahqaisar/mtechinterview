const express = require("express");
var router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/sendcode", UserController.sendCode);
router.post("/verifycode", UserController.verifyCode);
router.post("/changepassword", UserController.resetPassword);

module.exports = router;
