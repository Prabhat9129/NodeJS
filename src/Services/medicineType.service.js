const modelType = require("../Mongoose/model/medicineType.model");

async function addType(data) {
  const type = await modelType.findOne({ name: data.body.name });
  let newtype = {};
  if (type) {
    newtype.message = "Data is alredy exits";
    return newtype;
  } else {
    // console.log("heloossgsg");
    newtype = await modelType.insertMany({
      name: data.body.name,
      addedBy: data.user._id,
    });
    return newtype;
  }
}

async function getAllTypes(user) {
  const types = modelType.find({ addedBy: user.user._id });
  //console.log(types);
  return types;
}
module.exports = { addType, getAllTypes };
