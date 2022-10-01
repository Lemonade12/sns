const jwt = require("jsonwebtoken");
const models = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const auth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        // console.log('error', 333333333333333);
        return res.status(401).json({ message: "Access token is not valid" });
      }
      const isExistingUser = await models.User.findOne({
        where: {
          email: decoded.USER_EMAIL,
        },
      });
      if (isExistingUser) {
        // console.log(555555555555555555);
        req.userId = decoded.USER_ID;
        next();
      } else {
        // console.log(6666666);
        return res.status(401).json({ message: "There is no user registered with that email" });
      }
    });
  } else {
    // console.log(456456);
    return res.status(401).json({ message: "Please send the token in the correct form" });
  }
};
module.exports = { auth };
