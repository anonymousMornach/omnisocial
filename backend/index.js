const express = require('express');
require("dotenv").config();
const app = express();
const cors = require('cors')
app.use(cors())
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const friendRoutes = require('./routes/friend');
const authRoutes = require('./routes/auth');
require("./database/mongoDb")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);

app.listen(process.env.PORT || 2000, () => {
    console.log("server is running on port 2000");
});