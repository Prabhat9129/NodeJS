const type = require("../Services/medicineType.service");

async function addType(data, user) {
  return await type.addType(data, user);
}

async function getAllTypes(user) {
  return await type.getAllTypes(user);
}

module.exports = { addType, getAllTypes };
