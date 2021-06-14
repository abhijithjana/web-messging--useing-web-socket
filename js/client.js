const socket=io('http://localhost:8000');

const form=document.getElementById('sendMessage');
const messageInput=document.getElementById('messageInput');
const messageContainer=document.querySelector('.container');


const names =prompt("Enter your name");
socket.emit('new-user-joined',names);