import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req,res,next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400,"All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username ,
        email,
        password: hashedPassword,
    })

    try {
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUserEmail || existingUsername) {
            return next(errorHandler(400, "User already exists"));
        }
        await newUser.save();
        res.json("Signup success");
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400,"All fields are required"));
    }

    try {
        const validateUser = await User.findOne({email})
        if(!validateUser){
            return next(errorHandler(400, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validateUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign({
            id: validateUser._id,
            role: validateUser.role
        },process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: userPassword, ...rest } = validateUser._doc;

        res.json({ token, user: rest });
    } catch (error) {
        next(error);
    }
}