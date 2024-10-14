import SpecialCollection from "../models/specialCollection.model.js";

// Create New Special Collection
export const addSpecialCollection = async (req, res, next) => {
    try {
        const { wasteType, wasteImage, chooseDate, wasteDescription, emergencyCollection } = req.body;

        if (!wasteType || !wasteImage || !chooseDate || !wasteDescription || !emergencyCollection) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSpecialCollection = new SpecialCollection({
            wasteType,
            wasteImage,
            chooseDate,
            wasteDescription,
            emergencyCollection,
        });

        const savedSpecialCollection = await newSpecialCollection.save();
        res.status(201).json({ message: "Special Collection added successfully", data: savedSpecialCollection });

    } catch (e) {
        console.error("Error in addSpecialCollection: ", e);
        next(e);
    }
};

// Get All Special Collections
export const getSpecialCollections = async (req, res, next) => {
    try {
        const collections = await SpecialCollection.find();
        res.status(200).json({ data: collections });
    } catch (error) {
        console.error("Error in getSpecialCollections: ", error);
        next(error);
    }
};

// Get Special Collection by ID
export const getSpecialCollectionsById = async (req, res, next) => {
    try {
        const collection = await SpecialCollection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.status(200).json({ data: collection });
    } catch (error) {
        console.error("Error in getSpecialCollectionsById: ", error);
        next(error);
    }
};

// Update Special Collection
export const updateSpecialCollection = async (req, res, next) => {
    try {
        const { wasteType, wasteImage, chooseDate, wasteDescription, emergencyCollection } = req.body;
        const updatedCollection = await SpecialCollection.findByIdAndUpdate(req.params.id, {
            wasteType,
            wasteImage,
            chooseDate,
            wasteDescription,
            emergencyCollection,
        }, { new: true });

        if (!updatedCollection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        res.status(200).json({ message: "Collection updated successfully", data: updatedCollection });
    } catch (error) {
        console.error("Error in updateSpecialCollection: ", error);
        next(error);
    }
};

// Delete Special Collection
export const deleteSpecialCollection = async (req, res, next) => {
    try {
        const deleteCollection = await SpecialCollection.findByIdAndDelete(req.params.id);
        if (!deleteCollection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.status(200).json({ message: "Collection deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSpecialCollection: ", error);
        next(error);
    }
};
