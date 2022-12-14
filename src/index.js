const express = require("express");
const userRouter = require("./user/userRouter");
const postRouter = require("./post/postRouter");
const router = express.Router();

router.use(userRouter);
router.use(postRouter);

module.exports = router;
