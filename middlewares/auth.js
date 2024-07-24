const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { error } = require("../utils/response");
const Admin = require("../models/admin");

module.exports = {
  isUser: async (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json(await error("Invalid Token", {}));
        } else {
          if (decoded) {
            let { companyId, userId, role } = decoded;
            req.decoded = {
              companyId: new ObjectId(companyId),
              userId: new ObjectId(userId),
              role,
            };
            next();
          } else {
            return res.json(await error("You are not User", {}));
          }
        }
      });
    } else {
      return res.status(401).json(await error("Unauthorized Access!...", {}));
    }
  },
  isAdmin: async (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
          return res.json(await error("Invalid Token", {}));
        } else {
          if (decoded.adminId) {
            req.user = await Admin.findById(decoded.adminId).select(
              "-password"
            );

            if (!req.user) {
              return res.json(await error("Unauthorized Access", {}));
            }

            if (req.user.isDeleted || !req.user.isActive) {
              return res.json(await error("Account Disabled", {}));
            }

            next();
          } else {
            return res.json(await error("Unauthorized Access", {}));
          }
        }
      });
    } else {
      return res.json(await error("Unauthorized Access", {}));
    }
  },
};
