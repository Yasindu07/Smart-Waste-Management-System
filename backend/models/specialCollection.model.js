import mongoose from "mongoose";

const SpecialCollectionSchema = new mongoose.Schema(
    {
        wasteType: {
            type: String,
            required: true,
            default: "Organic",
        },
        wasteImage: {
            type: String,
            required: true,
        },
        chooseDate: {
            type: Date,
            required: true,
        },
        wasteDescription: {
            type: String,
            required: true,
        },
        emergencyCollection: {
            type: String,
            required: true,
        }
    }, 
    { timestamps: true }
);

const SpecialCollection = mongoose.model("SpecialCollection", SpecialCollectionSchema);
export default SpecialCollection;
