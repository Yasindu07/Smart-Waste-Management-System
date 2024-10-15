import Device from "../models/device.model.js";
import { errorHandler } from "../utils/error.js";

export const addDevice = async (req, res, next) => {
    const { wasteType, userId } = req.body;
    
    if (!wasteType) {
        return next(errorHandler(400, "All fields are required"));
    }

     // Utility function to generate a random number between 0 and 100
    const getRandomWasteLevel = () => Math.floor(Math.random() * 101);

    const wasteLevel = {
        organic: getRandomWasteLevel(),
        recycle: getRandomWasteLevel(),
        nonRecycle: getRandomWasteLevel(),
    };
    
    const newDevice = new Device({
        wasteType,
        wasteLevel,
        userId,
    });
    
    try {
        const existingDevice = await Device.findOne({ userId });

    if (existingDevice) {
      return next(errorHandler(400, "User already has a linked device"));
    }
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

export const getAllDevices = async (req, res, next) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        next(error);
    }
}

export const getDeviceByUserId = async (req, res, next) => {
    const { userId } = req.params;

  try {
    const device = await Device.findOne({ userId });

    if (!device) {
      return res.status(404).json({ message: "Device not found for this user" });
    }

    res.json(device);
  } catch (error) {
    next(error);
  }
}


