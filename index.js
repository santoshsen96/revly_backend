const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connection } = require('./db');
require('dotenv').config();
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//require('./cron');
app.use(cors())

app.use(express.json())

const {studentRouter}=require('./routes/student.route')
const {tutorRouter}=require('./routes/tutor.route')
const {doubtRouter}=require('./routes/doubtRequest.route')
const {tutorAvailRouter}=require('./routes/tutorAvail.route')
app.use("/students",studentRouter)
app.use('/tutors',tutorRouter)
app.use('/doubt',doubtRouter)
app.use('/',tutorAvailRouter)

// Socket.IO connection logic
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.emit('message', 'Welcome to DoubtShare!');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

server.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`running at port ${process.env.port} `)
    }catch(err){
        console.log(err)
        console.log("something went wrong")
    }

})