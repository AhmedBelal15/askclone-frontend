import { io } from "socket.io-client";
import toast from 'react-hot-toast';

const notify = (message) => toast(message);
const socket = io('https://imcurious-backend.herokuapp.com')


// socket.on('disconnect', )
socket.on('like', (msg)=>{
    notify(msg)
})
socket.on('question', (msg)=>{
    notify(msg)
})

socket.on('answer', (msg)=>{
    notify(msg)
})

export default socket