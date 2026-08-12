const express = require('express')
const router = express.Router()
const authenticate = require("../middleware/authMiddleware")
const validate = require("../middleware/validate")
const postDto = require("../dto/postDto")
const { createPostController } = require("../controllers/postController")


// create post 
router.post("/create-post", authenticate, validate(postDto), createPostController)

module.exports = router;