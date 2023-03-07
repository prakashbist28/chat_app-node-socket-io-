const socket= io.connect('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container") //drop messages in this container
var audio = new Audio('Notification.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();//pg doesnt reload
    const message = messageInput.value
    append(`you: ${message}`, 'right');
    socket.emit('send', message) //inform server that u r sending msg
    messageInput.value='' //empty chat box after sending msg
})

const name = prompt("enter your name to join : ");
socket.emit('new-user-joined', name)
 
socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data =>{  //receive in index
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('left', name =>{  //left in index
    append(`${name} left the chat`,'left')
})
