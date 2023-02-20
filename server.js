const http = require("http");
const app = require("./src/App");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`server Running on ${process.env.PORT}`);
});
