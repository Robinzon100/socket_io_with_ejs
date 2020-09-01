const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/:room", (req, res) => {
  let roomName
  if (req.params.room == 'chucha_sastav') {
    roomName = "chucha_sastav"
  }
  res.render("room", { roomName: roomName });
});

server.listen(3000);

io.on("connection", socket => {
  socket.on("join_room", room => {
    if (room == "chucha_sastav") {
      socket.join(room)
      console.log("joined " + room);
    }
  })

  socket.on("message", data => {
    socket
      .nsp
      .to("chucha_sastav")
      .emit("send_from_server_msg", data)
  })
})


