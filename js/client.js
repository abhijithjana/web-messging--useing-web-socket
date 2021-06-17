let socket = io("http://localhost:3238", {
  // withCredentials: true,
  "Access-Control-Allow-Methods":
    "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH",
  extraHeaders: {
    client: "",
  },
})

let chat = document.getElementById("sendMessage")
let messageInput = document.getElementById("messageInput")
let msgs = document.querySelector(".messages")

appendMessage = (msg, mode) => {
  let cnt = `<div class=message ${mode}>${msg}</div>`
  msgs.innerHTML += cnt
}

chat.addEventListener("submit", (e) => {
  e.preventDefault()
  let msg = chat.msg.value
  socket.emit("message outgoing", { sid: socket.id, msg: msg })
  appendMessage(msg, "incoming")
  msg = ""
})

socket.on("message incoming", (msg) => {
  console.log(msg, "incoming")
  appendMessage(msg, "incoming")
})

// socket.on("message outgoing", (msg) => {
//   console.log(msg)
//   appendMessage(msg, "outgoing")
// })

const name = prompt("Enter your name")
socket.emit("new-user-joined", name)
