const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "dist")));

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const getApiAndEmit = (socket) => {
  const response = new Date().toLocaleString([], {
    timeZone: "Europe/London",
  });
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

let interval;

io.on("connection", (socket) => {
  console.log("connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
