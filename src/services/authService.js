const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../helpers/generateTokens");
const { generateVerificationToken } = require('../helpers/tokenHelper');

const signupUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists with this email.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { token, hashedToken } = generateVerificationToken()
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        emailVerificationToken: hashedToken
    });
    return { newUser, verificationToken: token };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) throw new Error("Invalid email or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");
    const token = generateToken({ id: user._id, role: user.role });
    return { user, token };
};

const getProfileService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
};

module.exports = { signupUser, loginUser, getProfileService };
