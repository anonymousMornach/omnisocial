const auth = require("express").Router();
const authController = require("../controllers/auth");
const { verifyToken, verifyTokenSafe} = require("../middleware/auth");

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.post("/", verifyTokenSafe, authController.checkAuth);
auth.post("/get_token",verifyTokenSafe, authController.sendTokenByEmail)
auth.post("/verify_token", verifyTokenSafe, authController.compareToken)

module.exports = auth;