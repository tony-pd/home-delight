const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const socketTemplate = require("socket.io").Server;

app.use(express.static("client"));

const socetServer = new socketTemplate(server);

socetServer.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("message", (message) => {
    socket.broadcast.emit("broadcast", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("private", ({message:receiverSocket}) => {
    console.log(data, message, receiverSocket);
    socket.broadcast.to(receiverSocket).emit("private", message);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Socket server</h1>");
});

server.listen(3001, () => {
  console.log("server is listening at port 3001");
});