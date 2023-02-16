const modelType = require("../Mongoose/model/medicineType.model");

async function addType(data, user) {
  const type = await modelType.findOne({ name: data.name });
  let newtype = {};

  if (type) {
    newtype.message = "Data is alredy exits";
    return newtype;
  } else {
    newtype = await modelType.create({
      name: data.name,
      addedBy: user._id,
    });
    return newtype;
  }
}

async function getAllTypes(user) {
  return user._id;
}
module.exports = { addType, getAllTypes };
