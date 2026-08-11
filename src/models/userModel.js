const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpiry: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
