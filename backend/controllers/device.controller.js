import Device from "../models/device.model.js";
import { errorHandler } from "../utils/error.js";

export const addDevice = async (req, res, next) => {
    const { wasteType, wasteLevel } = req.body;
    const user = req.user;
    
    if (!wasteType || !wasteLevel) {
        return next(errorHandler(400, "All fields are required"));
    }
    
    const newDevice = new Device({
        wasteType,
        wasteLevel,
        user,
    });
    
    try {
        await newDevice.save();
        res.json("Device added successfully");
    } catch (error) {
        next(error);
    }
}

export const getDevices = async (req, res, next) => {
    const user = req.user;
    
    try {
        const devices = await Device.find({ user });
        res.json(devices);
    } catch (error) {
        next(error);
    }
}

