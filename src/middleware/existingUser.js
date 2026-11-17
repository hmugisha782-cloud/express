import User from "../models/user.js";

async function usereExist(req, res, next) {
    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to check existing user",
            error: error.message
        });
    }
}

export default usereExist;
