const { error } = require("../utils/response");
const { validationKeys, payloadValidation } = require("../utils/validations");

module.exports = {
  validate: async (req, res, next) => {
    try {
      let payload = req.body;
      let { url, method } = req;
      let keys = validationKeys[url];

      if (keys && method === "POST") {
        let validations = await payloadValidation(payload, keys);
        if (!validations.isValid) {
          return res
            .status(400)
            .json(await error(validations.message, validations));
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(await error(err.message, err));
    }
  },
};
