let io = require("socket.io")(3238, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
  },
})

let time = new Date()
time = `${time.getHours()}:${time.getMinutes()} : ${time.getSeconds()}`

console.log("Server started @ ", time)

const users = {}

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.emit("message", "You are connected")
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("message outgoing", (message) => {
    let { sid, msg } = message
    console.log(msg, "Outgoing")
    socket.broadcast.emit("message incoming", msg)
    // let receivers = Object.keys(users).filter((id) => id !== sid)
    // receivers.map((sid) => io.to(sid).emit("message incoming", msg))
  })

  socket.on("new-user-joined", (name) => {
    console.log("new user", name)
    users[socket.id] = name
    socket.broadcast.emit("user-join", name)
  })
})
