let socket = io("http://localhost:3238")
let chat = document.getElementById("sendMessage")
let messageInput = document.getElementById("messageInput")
let msgs = document.querySelector(".messages")

appendMessage = (msg, mode) => {
  let cnt = `<div class= "message ${mode}">${msg}</div>`
  msgs.innerHTML += cnt
}

appendMessage("Hiro", "outgoing")
appendMessage("Abhi", "incoming")

chat.addEventListener("submit", (e) => {
  e.preventDefault()
  msg = chat.msg.value
  socket.emit("message outgoing", { sid: socket.id, msg: msg })
  appendMessage(msg, "outgoing")
  chat.msg.value = ""
})

socket.on("message incoming", (msg) => {
  console.log(msg, "incoming")
  appendMessage(msg, "incoming")
})

// const name = prompt("Enter your name")
// socket.emit("new-user-joined", name)
