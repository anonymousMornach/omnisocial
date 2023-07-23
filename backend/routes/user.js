const users = require("express").Router();
const usersController = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

users.get("/", usersController.getAllUsers);
users.get("/:username", usersController.getUserById);
users.put("/:username", verifyToken, usersController.updateUser);
users.delete("/:username", verifyToken, usersController.deleteUser);


module.exports = users;