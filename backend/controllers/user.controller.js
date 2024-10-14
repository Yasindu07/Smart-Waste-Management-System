import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const addUsers = async (req,res,next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to add a collector"));
    }
    const { role } = req.query;
    const { username, email, nic, phone, address } = req.body;

    if(!username || !email || !nic || !phone || !address || username === '' || email === '' || nic === '' || phone === '' || address === ''){
        next(errorHandler(400,"All fields are required"));
    }

    const allowedRoles = ['collector', 'manager'];
    if (!role || !allowedRoles.includes(role)) {
        return next(errorHandler(400, 'Invalid or missing role'));
    }

    const hashedPassword = bcryptjs.hashSync(nic, 10);

    const newUser = new User({
        username,
        email,
        nic,
        phone,
        address,
        password: hashedPassword,
        role
    })

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return next(errorHandler(400, 'User with this email or username already exists'));
        }
        
        await newUser.save();
        res.json(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully`);
    } catch (error) {
        next(error);
    }
}

export const getUsersByRole = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to access data"));
    }
    const { role } = req.query; 

    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to access this resource"));
    }

    if (!role) {
        return next(errorHandler(400, "Role is required"));
    }
    try {
        const collectors = await User.find({ role });

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
