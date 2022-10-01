const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post("/user/signup", userController.signup);
router.post("/user/signin", userController.signin);

module.exports = router;
