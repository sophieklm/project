const express = require("express");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.emit("news", { hello: "world" });
  socket.on("my other event", (data) => {
    console.log(data);
  });
});
