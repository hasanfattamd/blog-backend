require("dotenv").config();
const { connect } = require("mongoose");
const connectDB = require("./src/config/db.js");
const express = require("express");
const authRoutes = require("./src/routes/authRoutes.js");
const categoryRoutes = require("./src/routes/categoryRoutes.js")

const app = express();

// Middlware
app.use(express.json());

// Auth 
app.use("/api/auth", authRoutes);
app.use('/api/categories', categoryRoutes);
// route
app.get("/", (req, res) => {
    res.send("Blog backend is running");
});

const PORT = process.env.PORT;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);
    });
};

startServer().catch((e) => console.error("error connecting server", e.message));
