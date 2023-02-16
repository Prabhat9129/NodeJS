const userService = require("../Services/user.service");

async function addUser(user) {
  return await userService.addUser(user);
}
async function loginUser(user) {
  return await userService.loginUser(user);
}

module.exports = { addUser, loginUser };
