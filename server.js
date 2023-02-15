const http = require("http");
const mongo = require("mongoose");
const app = require("./src/App");

const server = http.createServer(app);
const PORT = 8080;

const mongoURL =
  "mongodb+srv://prabhatDixit:Ta7P37viTTNh3L80@nodejsapis.rii3yw3.mongodb.net/?retryWrites=true&w=majority";

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

server.listen(PORT, () => {
  console.log(`server Running on ${PORT}`);
});
