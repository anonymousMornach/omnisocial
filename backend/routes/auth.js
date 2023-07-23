const auth = require("express").Router();
const authController = require("../controllers/auth");
const { verifyToken } = require("../middleware/auth");

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.post("/checkauth", authController.checkAuth);

module.exports = auth;