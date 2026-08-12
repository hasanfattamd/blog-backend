const {
    signupUser,
    loginUser,
    getProfileService,
    createCategoryService,
} = require("../services/authService");

const signup = async (req, res) => {
    try {
        const newUser = await signupUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        console.log(user);
        return res.status(200).json({
            success: true,
            message: "login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: error.message,
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await getProfileService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Profile fetch successfully.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.idsVerified,
            },
        });
    } catch (error) {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const category = createCategoryService(req.body)
        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}



module.exports = { signup, login, getProfile, createCategory };
