const user = require("../Mongoose/model/user.model");

async function addUser() {
  try {
    // console.log("hello user");
    // console.log(req.body);
    const newUsr = await user.create(req.body);
    //console.log(newusr);
    res.status(201).json({
      message: "success",
      data: {
        user: newUsr,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
}

module.exports = { addUser };
