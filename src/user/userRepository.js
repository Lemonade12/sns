const db = require("../../database/index");
const user = db.user;
const sequelize = require("sequelize");
const Op = sequelize.Op;

async function readUserByEmail(email) {
  const data = await user.findOne({
    where: { email: email },
  });
  return data;
}

async function createUser(email, name, password) {
  return user.create({
    email: email,
    name: name,
    password: password,
  });
}

module.exports = {
  readUserByEmail,
  createUser,
};
