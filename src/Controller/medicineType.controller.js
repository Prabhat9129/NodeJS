const type = require("../Services/medicineType.service");

async function addType(data) {
  return await type.addType(data);
}

async function getAllTypes(user) {
  return await type.getAllTypes(user);
}

module.exports = { addType, getAllTypes };
