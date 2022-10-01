const { StatusCodes } = require("http-status-codes");
const userService = require("./userService");

async function signup(req, res) {
  try {
    const userInfo = req.body;
    await userService.signup(userInfo);
    return res.status(StatusCodes.OK).send({ message: "회원가입 완료" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function signin(req, res) {
  try {
    const userInfo = req.body;
    const data = await userService.signin(userInfo);
    return res.status(StatusCodes.OK).send({ data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = {
  signup,
  signin,
};
