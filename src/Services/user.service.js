const userModel = require("../Mongoose/model/user.model");
const bcrypt = require("bcrypt");

async function addUser(user) {
  // console.log("in side", user.body);
  const salt = await bcrypt.genSalt();
  let hash = bcrypt.hashSync(user.body.password, salt);

  const check = await userModel.findOne({ email: user.body.email });
  // console.log(check);
  let data = {};
  if (check) {
    data.message = "User Alredy Exits";
    // console.log(data);
    return data;
  } else {
    if (!user.body.email || !user.body.password) {
      return (data.message = "Please provide email and password");
    } else {
      data = await userModel.insertMany([
        {
          name: user.body.name,
          email: user.body.email,
          number: user.body.number,
          password: hash,
        },
      ]);
      console.log(data);
      return data;
    }
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
