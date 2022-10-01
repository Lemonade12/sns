const jwt = require("jsonwebtoken");
const db = require("../database/index");
const user = db.user;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const auth = async (req, res, next) => {
  if (req.headers.authorization) {
    const access_token = req.headers.authorization;
    jwt.verify(access_token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        // console.log('error', 333333333333333);
        return res.status(401).json({ message: "Access token 이 유효하지 않습니다." });
      }
      const isExistingUser = await user.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (isExistingUser) {
        // console.log(555555555555555555);
        req.userId = decoded.id;
        next();
      } else {
        // console.log(6666666);
        return res.status(401).json({ message: "존재하지 않는 유저 입니다." });
      }
    });
  } else {
    // console.log(456456);
    return res.status(401).json({ message: "Access token 이 존재하지 않습니다." });
  }
};
module.exports = { auth };
