const Category = require("../models/categoryModel");

const createCategoryService = async ({ name }) => {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) throw new Error("Category already exists.");
    const category = Category.create({ name });
    return category;
};

module.exports = { createCategoryService };
