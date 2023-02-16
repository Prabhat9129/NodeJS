const userModel = require("../Mongoose/model/user.model");
const bcrypt = require("bcrypt");

async function addUser(user) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(user.password, salt);
  const check = await userModel.findOne({ email: user.email });
  let data = {};
  if (check) {
    data.message = "User Alredy Exits";
    return data;
  }
  data = await userModel.create([
    {
      name: user.name,
      email: user.email,
      number: user.number,
      password: hash,
    },
  ]);
  return data;
}

async function loginUser(user) {
  const userData = await userModel.findOne({ email: user.email });
  if (userData) {
    const id = bcrypt.compareSync(user.password, userData.password);
    return id ? { _id: userData._id } : null;
  }
  return null;
}

module.exports = { addUser, loginUser };
