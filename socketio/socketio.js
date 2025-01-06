const express = require("express")
const app = express()
const Server = require("socket.io")
const http = require("http")
const User = require("../models/user-model")


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000/",
        methods: ["GET", "POST"]
    }
})
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}
const users = {}
io.on("connection", async (socket) => {
    console.log("client connected", socket.id)
    const userid = socket.handshake.query.userid
    io.emit("user", {userconnected: socket.id})
    
socket.on('message', function(a){
console.log(a)
io.emit('message',a)
})

    socket.on('roomid', async (m) => {
        console.log("User Data :", m)

        const { reciver, user } = m
        if (user) {
            await User.findOneAndUpdate(
                { _id: user },
                { status: "Online", lastSeen: new Date() }),

                users[user] = socket.id
            console.log("user id :", user)
          
            socket.on("disconnect", async () => {
                await User.findOneAndUpdate(
                    { _id: user},
                    { status: "Offline", lastSeen: new Date() }), 
        
                    console.log("User disconnected",user)
        })
        }
        if (reciver) {
            const ReceiverSocketId = getReceiverSocketId(reciver)
            console.log("socket id ", ReceiverSocketId)
            io.to(ReceiverSocketId).emit('ReceiverSocketId', socket.id)
        }

    })



})

module.exports = { app, io, server, getReceiverSocketId }