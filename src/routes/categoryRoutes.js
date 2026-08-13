const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
const validate = require("../middleware/validate");
const createCategoryDto = require("../dto/categoryDto.js");
const { createCategory } = require("../controllers/categoryController");

router.post(
    "/",
    authenticate,
    authorize("admin"),
    validate(createCategoryDto),
    createCategory,
);

module.exports = router;



