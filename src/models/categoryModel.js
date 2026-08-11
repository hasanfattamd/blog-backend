const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true },
);

modules.exports = mongoose.model("Category", categorySchema);
