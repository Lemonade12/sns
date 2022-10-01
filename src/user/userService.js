const userRepo = require("./userRepository");
const bcrypt = require("bcrypt");
const secret_key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
}

async function signup(userInfo) {
  const { email, password, name } = userInfo;
  const isExistedUser = await userRepo.readUserByEmail(email);
  if (isExistedUser) {
    const error = new Error("이미 사용중인 이메일 입니다.");
    error.statusCode = 400;
    throw error;
  }
  userRepo.createUser(email, name, await encryptPassword(password));
}

async function signin(userInfo) {
  const { email, password } = userInfo;
  const isExistedUser = await userRepo.readUserByEmail(email);
  if (!isExistedUser) {
    const error = new Error("존재하지 않는 ID 입니다.");
    error.statusCode = 400;
    throw error;
  }
  const isValidPassword = await bcrypt.compare(userInfo.password, isExistedUser.password);

  if (isValidPassword) {
    const payload = {
      id: isExistedUser.id,
    };
    const access_token = jwt.sign(payload, secret_key, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    return { access_token };
  } else {
    const error = new Error("비밀번호가 틀렸습니다.");
    error.statusCode = 401;
    throw error;
  }
}

module.exports = {
  signup,
  signin,
};
