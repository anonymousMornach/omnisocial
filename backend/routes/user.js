const users = require("express").Router();
const usersController = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

users.get("/", usersController.getAllUsers);
users.get("/user/private", verifyToken, usersController.getUserByIdPrivate);
users.get("/:username", verifyToken, usersController.getUserById);
users.put("/", verifyToken, usersController.updateUser);
users.delete("/:username", verifyToken, usersController.deleteUser);


module.exports = users;