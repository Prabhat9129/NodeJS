const mongo = require("mongoose");
const mongoURL = process.env.DATABASE;

async function mongoConnection() {
  mongo.connection.once("open", () => {
    console.log("connection redy");
  });
  mongo.connection.on("error", () => {
    console.log(`Not connected, error ${error}`);
  });
  mongo.set("strictQuery", true);
  await mongo.connect(mongoURL, () => {
    useNewUrlParser: true;
    useUnifideTopology: true;
  });
}

module.exports = { mongoConnection };
