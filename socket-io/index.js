const io = require("socket.io")(9090, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const adduser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getuser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeuser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("a user connected");
  //take userID and socket id
  socket.on("addUser", (userId) => {
    adduser(userId, socket.id);
    io.emit("getUser", users);
  });

  //send and get message
  socket.on("sendmessage", ({ userId, recieverId, text }) => {
    const user = getuser(recieverId);
    io.to(user.socketId).emit("getmessage", {
      userId,
      text,
    });
  });

  //when disconnencts
  socket.on("disconnect", () => {
    console.log("disconnected");
    removeuser(socket.id);
    io.emit("getUser", users);
  });
});
