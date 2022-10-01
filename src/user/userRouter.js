const express = require("express");
const userController = require("./userController");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.post("/user/signup", userController.signup);
router.post("/user/signin", userController.signin);
router.get("/user", authMiddleware.auth, userController.signup);

module.exports = router;
