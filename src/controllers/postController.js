const createPostService = require("../services/postService")

const createPostController = async (req, res) => {
    try {
        const post = await createPostService(
            {
                ...req.body,
                author: req.user.id
            }
        )

        return res.status(201).json({
            success: true,
            message: "A new post is created successfully",
            data: post
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = { createPostController }