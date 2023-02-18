const userModel = require("../Mongoose/model/user.model");
const bcrypt = require("bcrypt");

async function addUser(user) {
  //console.log("in side", user.body);
  const salt = await bcrypt.genSalt();
  let hash = "";
  if (user.body.password) {
    hash = bcrypt.hashSync(user.body.password, salt);
  }
  const check = await userModel.findOne({ email: user.body.email });
  let data = {};
  if (check) {
    data.message = "User Alredy Exits";
    return data;
  }
  if (!user.body.email || !user.body.password) {
    return (data.message = "Please provide email and password");
  } else {
    data = await userModel.create([
      {
        name: user.body.name,
        email: user.body.email,
        number: user.body.number,
        password: hash,
      },
    ]);
    return data;
  }
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
