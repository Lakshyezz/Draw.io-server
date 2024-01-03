import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
app.use(cors({origin: "http://localhost:3000/"}));

const io = new Server(server,{ cors : "http://localhost:3000/" }); // from socket.io


io.on('connection' , (socket)=>{
    // console.log('server connected');

    socket.on('beginPath', (arg) =>{
        socket.broadcast.emit('beginPath',arg)
    });
    socket.on('drawLine', (arg) =>{
        socket.broadcast.emit('drawLine',arg)
    })
    socket.on('changeConfig', (arg) =>{
        socket.broadcast.emit('changeConfig',arg)
    })
});

app.get('/', (req, res)=>{
    res.json("YES ITS RUNNING");
})

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});