import Truck from "../models/truck.model.js";
import { errorHandler } from "../utils/error.js";

export const addTrucks = async (req,res,next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to add a truck"));
    }

    if(!req.body.brand || !req.body.numberPlate || !req.body.capacity) {
        return next(errorHandler(400, "All fields are required"));
    }

    const newTruck = new Truck({
        ...req.body,
    });

    try {
        const savedTruck = await newTruck.save();
        res.status(201).json(savedTruck);
    } catch (error) {
        next(error);
    }

}

export const getAllTrucks = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to view trucks"));
    }
    try {
        const trucks = await Truck.find();
        res.status(200).json(trucks);
    } catch (error) {
        next(error);
    }
};

export const getAllTruckNumbers = async (req, res, next) => {
    try {
        const trucks = await Truck.find();
        res.status(200).json(trucks);
    } catch (error) {
        next(error);
    }
};


export const getTruckById = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to view trucks"));
    }
    const { id } = req.params;

    try {
        const truck = await Truck.findById(id);
        if (!truck) {
            return next(errorHandler(404, "Truck not found"));
        }
        res.status(200).json(truck);
    } catch (error) {
        next(error);
    }
};

export const updateTruck = async (req, res, next) => {
    const { id } = req.params;

    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to update trucks"));
    }

    try {
        const updatedTruck = await Truck.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTruck) {
            return next(errorHandler(404, "Truck not found"));
        }
        res.status(200).json(updatedTruck);
    } catch (error) {
        next(error);
    }
};


export const deleteTruck = async (req, res, next) => {
    const { id } = req.params;

    if (req.user.role !== "admin") {
        return next(errorHandler(403, "You are not allowed to delete trucks"));
    }

    try {
        const deletedTruck = await Truck.findByIdAndDelete(id);
        if (!deletedTruck) {
            return next(errorHandler(404, "Truck not found"));
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        next(error);
    }
};