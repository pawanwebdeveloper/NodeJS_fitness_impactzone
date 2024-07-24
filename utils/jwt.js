const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: async (payload) => {
    let token = await jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  },
  verifyJWT: async (token, next) => {
    let user = await jwt.verify(token, process.env.JWT_KEY);
    return user;
  },
};
