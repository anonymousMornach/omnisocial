const posts = require("express").Router();
const postsController = require("../controllers/post");

posts.get("/", postsController.getAllPosts);
posts.get("/:postId", postsController.getPostsByUser);
posts.post("/", postsController.addPost);
posts.put("/:postId", postsController.updatePosts);
posts.delete("/:postId", postsController.deletePosts);

module.exports = posts;