import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const addCollector = async (req,res,next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to add a collector"));
    }
    const { username, email, nic, phone, address } = req.body;

    if(!username || !email || !nic || !phone || !address || username === '' || email === '' || nic === '' || phone === '' || address === ''){
        next(errorHandler(400,"All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(nic, 10);

    const newUser = new User({
        username,
        email,
        nic,
        phone,
        address,
        password: hashedPassword,
        role: "collector",
    })

    try {
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUserEmail || existingUsername) {
            return next(errorHandler(400, "User already exists"));
        }
        await newUser.save();
        res.json("colloctor added successfully");
    } catch (error) {
        next(error);
    }
}

export const getCollectors = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to add a collector"));
    }
    try {
        const collectors = await User.find({ role: "collector" });

        if (!collectors || collectors.length === 0) {
            return next(errorHandler(404, "No collectors found"));
        }

        res.json(collectors);
    } catch (error) {
        next(error);
    }
};


export const completeProfile = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    const { phone, address, nic } = req.body;
    const userId = req.params.userId; 
    
    if (!phone || !address || !nic) {
        return next(errorHandler(400, "Phone, address, and NIC are required"));
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { phone, address, nic, isCompleted: true },
            { new: true } // To return the updated document
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({ message: "Profile updated successfully", user: rest });
    } catch (error) {
        next(error);
    }
};
