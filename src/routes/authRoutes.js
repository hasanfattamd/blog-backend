const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const authenticate = require("../middleware/authMiddleware");
const { userSignupSchema, userLoginSchema } = require("../dto/authDto");
const { signup, login, getProfile } = require("../controllers/authController");
const postDto = require("../dto/postDto")
const createPostController = require("../controllers/postController")

// Public routes
router.post("/signup", validate(userSignupSchema), signup);
router.post("/login", validate(userLoginSchema), login);

// Protected routes
router.get("/profile", authenticate, getProfile);

module.exports = router;
