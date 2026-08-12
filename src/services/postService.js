const Post = require('../models/postModel');
const Category = require("../models/categoryModel")

const createPostService = async ({ title, content, category, author }) => {
    const categoryExists = Category.findById(category);
    if (!categoryExists) throw new Error("Category not found")

    const post = Post.create({ title, content, category, author })
    return post;
}
z
module.exports = createPostService