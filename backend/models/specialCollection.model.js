import mongoose from "mongoose";

const SpecialCollectionSchema = new mongoose.Schema(
    {
        user: {
            type: Object,
            required: true,
        },
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
        },
        payment: {
            type: Number,
        },
        wasteStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    }, 
    { timestamps: true }
);

const SpecialCollection = mongoose.model("SpecialCollection", SpecialCollectionSchema);
export default SpecialCollection;
