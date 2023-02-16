const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const userModel = require("../Mongoose/model/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decode._id });
    if (!user) throw new Error();
    res.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate." });
  }
};
module.exports = { auth };
