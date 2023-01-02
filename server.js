const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);//options,

// httpRequest()
server.listen(
  process.env.PORT || 3000,
  console.log("Serveur listening in port : 3000")
);
