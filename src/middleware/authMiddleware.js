const jwt = require("jsonwebtoken");
const dotenv = require("dotenv/config");
const User = require("../models/userModel")

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userExist = await User.findById(decoded.id)
        if (!userExist) return res.status(401).json({ succes: false, message: "Sorry 🙁! User no longer exists!" })
        req.user = decoded;
        console.log(decoded)
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authenticate;
