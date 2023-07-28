const posts = require("express").Router();
const postsController = require("../controllers/post");
const {verifyToken} = require("../middleware/auth");

posts.get("/", postsController.getAllPosts);
posts.get("/:username", postsController.getPostsByUser);
posts.post("/", verifyToken, postsController.addPost);
posts.put("/:postId", postsController.updatePosts);
posts.delete("/:postId", postsController.deletePosts);
posts.post('/:postId/love',verifyToken, postsController.lovePost);

module.exports = posts;