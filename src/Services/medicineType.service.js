const modelType = require("../Mongoose/model/medicine_type.model");

async function addType(req, res) {
  try {
    const newtype = await modelType.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newType: newtype,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
}

async function findTypes(req, res) {
  try {
    const allType = await modelType.find();
    res.status(200).json({
      status: "succes",
      data: {
        values: allType,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
}
module.exports = { addType, findTypes };
