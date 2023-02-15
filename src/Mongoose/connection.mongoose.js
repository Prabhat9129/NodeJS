const mongo = require("mongoose");

const mongoURL =
  "mongodb+srv://prabhatDixit:Ta7P37viTTNh3L80@nodejsapis.rii3yw3.mongodb.net/?retryWrites=true&w=majority";

mongoConnection = () => {
  mongo.connection.once("open", () => {
    console.log("connection redy");
  });
  mongo.connection.on("error", () => {
    console.log(`Not connected, error ${error}`);
  });
  mongo.set("strictQuery", true);
  mongo.connect(mongoURL, () => {
    useNewUrlParser: true;
    useUnifideTopology: true;
  });
};

//module.exports = { mongoConnection };
