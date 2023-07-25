const express = require('express');
require("./database/mongoDb");
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

require("dotenv").config();
const app = express();
const server = http.createServer(app); // Use the http server created from express
const io = socketIO(server, {
    cors: {
        origin: ["http://localhost:3000", "https://omnisocial.vercel.app"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
    },
});

// No need for the STATIC_CHANNELS constant in this code snippet.

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const friendRoutes = require('./routes/friend');
const authRoutes = require('./routes/auth');

app.use(cors()); // No need for corsOptions in this code snippet.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);

io.on('connection', (socket) => {
    console.log("Client Connected");

    // Error handling for the 'connected' event
    socket.on('error', (err) => {
        console.error('Socket.IO Error:', err);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('new_post', (data)=>{
        socket.emit('new_post', data);
        socket.broadcast.emit('new_post', data);
    })

    socket.broadcast.emit('connected', "Great");
});

server.listen(process.env.PORT || 2000, () => {
    console.log("server is running on port 2000");
});
